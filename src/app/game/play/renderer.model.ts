
import * as PIXI from 'pixi.js-legacy';
import { EcsService } from 'src/app/ecs.service';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Renderable } from 'src/lib/components/renderable.model';
import { Position } from 'src/lib/components/position.model';

export interface RendererSettings {
  tileSize: number;
  displayWidthInTiles: number;
}

export class Renderer {

  static create(
    ecs: EcsService,
    sheet: string,
    settings: RendererSettings,
    pixiAppOptions: object,
  ): Observable<Renderer> {

    const subject = new Subject<Renderer>();
    const renderer = new Renderer(ecs, settings, pixiAppOptions);
    renderer.pixiApp.loader.add(sheet).load(() => {
      renderer.resources = renderer.pixiApp.loader.resources[sheet];
      console.log(renderer.pixiApp.loader.resources[sheet].textures['Floor-192.png']);
      renderer.pixiApp.ticker.add( () => renderer.renderUpdate() );
      subject.next(renderer);
    });
    return subject.pipe(take(1));
  }

  private sprites = new Map<number, PIXI.Sprite>();
  private pixiApp: PIXI.Application;
  private resources: PIXI.LoaderResource;
  private desiredDisplayWidthPx: number;

  private constructor(
    private ecs: EcsService,
    private settings: RendererSettings,
    options: object
  ) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.pixiApp = new PIXI.Application(options);
    this.desiredDisplayWidthPx = settings.tileSize * settings.displayWidthInTiles;
  }

  get view() { return this.pixiApp.view; }

  renderUpdate(): void {

    this.pixiApp.stage = new PIXI.Container();
    const stage = this.pixiApp.stage;

    this.ecs.em.each((e, r, p) => {

      if ( ! this.sprites.has(e.id) ) {
        const sprite = new PIXI.Sprite(this.resources.textures[r.image]);
        this.sprites.set(e.id, sprite);
      }
      const TILE_SIZE = this.settings.tileSize;
      const sprite = this.sprites.get(e.id);
      sprite.position.set(
        p.x * TILE_SIZE, 
        p.y * TILE_SIZE
      );
      stage.addChild(sprite);

    }, Renderable, Position);

    console.log(`desired width: ${this.desiredDisplayWidthPx} vs actual: ${this.pixiApp.renderer.width}`);
    stage.scale.set( this.pixiApp.renderer.width / this.desiredDisplayWidthPx );
  }

  resize(): void {
    this.pixiApp.resize();
  }

}