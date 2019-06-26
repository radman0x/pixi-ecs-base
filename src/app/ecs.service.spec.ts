import { TestBed } from '@angular/core/testing';

import { EcsService } from './ecs.service';

describe('EcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcsService = TestBed.get(EcsService);
    expect(service).toBeTruthy();
  });
});
