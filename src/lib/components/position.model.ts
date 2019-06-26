import { Component } from 'rad-ecs';

export class Position extends Component {

  constructor(
    public x: number,
    public y: number,
    public z: number
  ) {
    super();
  }

  hash(): string {
    return `${this.x},${this.y},${this.z}`;
  }

}