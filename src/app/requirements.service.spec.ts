import { TestBed, inject } from '@angular/core/testing';

import { RequirementsService } from './requirements.service';

describe('RequirementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequirementsService]
    });
  });

  it('should be created', inject([RequirementsService], (service: RequirementsService) => {
    expect(service).toBeTruthy();
  }));
});
