import { TestBed } from '@angular/core/testing';

import { QusetionService } from './qusetion.service';

describe('QusetionService', () => {
  let service: QusetionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QusetionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
