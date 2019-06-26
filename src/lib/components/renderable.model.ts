import { Component } from 'rad-ecs';

export class Renderable extends Component {
  constructor(
    public readonly image: string,
    public readonly zOrder: number
  ) {
    super();
  }

}