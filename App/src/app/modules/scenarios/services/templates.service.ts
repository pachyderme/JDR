import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  constructor() {}

  public get(): any[] {
    return [
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
  }
}
