/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UniversService } from './univers.service';

describe('Service: Univers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversService]
    });
  });

  it('should ...', inject([UniversService], (service: UniversService) => {
    expect(service).toBeTruthy();
  }));
});
