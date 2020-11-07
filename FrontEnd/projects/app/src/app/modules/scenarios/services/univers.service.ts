import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectInitials } from '../models/select-initials';

@Injectable({
  providedIn: 'root',
})
export class UniversService {
  private items: SelectInitials[] = [
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

  constructor() {}

  public list(): Observable<SelectInitials[]> {
    return of(this.items);
  }
}
