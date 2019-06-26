import { Injectable } from '@angular/core';

import { EntityManager} from 'rad-ecs'
;
@Injectable({
  providedIn: 'root'
})
export class EcsService {

  private entityManager = new EntityManager();

  constructor() { }

  get em() { return this.entityManager; }

  
}
