import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EcsService } from '../ecs.service';

import { Position, Renderable } from 'src/lib/components/components.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private ecs: EcsService
  ) { }

  ngOnInit() {
    for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < 7; ++j) {
        this.ecs.em.createEntity(
          new Position(i, j, 0),
          new Renderable('Floor-192.png', 0)
        );
      }
    }
  }


  currentSize(elem: HTMLDivElement): DOMRect {
    return elem.getBoundingClientRect() as DOMRect;
  }

}
