import { TestBed } from '@angular/core/testing';

import { TokboxService } from './tokbox.service';

describe('TokboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokboxService = TestBed.get(TokboxService);
    expect(service).toBeTruthy();
  });
});
