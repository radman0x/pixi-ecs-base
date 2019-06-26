import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Renderer } from './renderer.model';
import { EcsService } from 'src/app/ecs.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('display', {static: false}) displayElem: ElementRef;
  @Input('rendererParent') rendererParentElem: HTMLElement;

  private renderer: Renderer;

  constructor(
    private ecs: EcsService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if ( this.renderer ) {
      this.renderer.resize();
    }
  }

  ngAfterViewInit(): void {
    Renderer.create(
      this.ecs, 
      'assets/assets.json', 
      { tileSize: 16, displayWidthInTiles: 10 },
      { backgroundColor: Number('0x0000FF'), resizeTo: this.rendererParentElem }
    ).subscribe( (r: Renderer) => {
      this.renderer = r;
      this.renderer.resize();
      (this.displayElem.nativeElement as HTMLElement).appendChild(this.renderer.view);
    });
  }

}
