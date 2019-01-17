import { TestBed, inject } from '@angular/core/testing';

import { SosService } from './sos.service';

describe('SosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SosService]
    });
  });

  it('should be created', inject([SosService], (service: SosService) => {
    expect(service).toBeTruthy();
  }));
});
