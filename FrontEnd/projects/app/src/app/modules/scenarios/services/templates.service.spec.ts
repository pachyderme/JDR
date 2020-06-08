/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TemplatesService } from './templates.service';

describe('Service: Templates', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplatesService]
    });
  });

  it('should ...', inject([TemplatesService], (service: TemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
