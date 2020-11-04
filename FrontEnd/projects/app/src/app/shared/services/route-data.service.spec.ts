/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouteDataService } from './route-data.service';

describe('Service: RouteDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteDataService],
    });
  });

  it('should ...', inject([RouteDataService], (service: RouteDataService) => {
    expect(service).toBeTruthy();
  }));
});
