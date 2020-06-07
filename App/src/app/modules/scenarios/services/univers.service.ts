import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniversService {
  constructor() {}

  public get(): any[] {
    return [
      {
        label: 'Dungeons and dragons',
        initials: 'DD',
      },
      {
        label: 'Lord of the rings',
        initials: 'LR',
      },
      {
        label: 'Star wars - Clone wars',
        initials: 'SW',
      },
      {
        label: 'Star wars - Rebels',
        initials: 'SW',
      },
      {
        label: "Star wars - The Great Sith's war",
        initials: 'SW',
      },
      {
        label: 'Star wars - The old republic',
        initials: 'SW',
      },
      {
        label: 'Warhammer',
        initials: 'WH',
      },
      {
        label: 'Warhammer 40k',
        initials: 'WH',
      },
    ];
  }
}
