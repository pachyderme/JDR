import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Select } from '../models/select';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  private items: Select[] = [
    {
      value: 0,
      displayValue: 'None',
    },
    {
      value: 1,
      displayValue: 'Linear',
    },
    {
      value: 2,
      displayValue: 'Branches',
    },
    {
      value: 3,
      displayValue: 'Sandbox',
    },
    {
      value: 4,
      displayValue: 'Emerging',
    },
  ];

  constructor() {}

  public list(): Observable<Select[]> {
    return of(this.items);
  }
}
