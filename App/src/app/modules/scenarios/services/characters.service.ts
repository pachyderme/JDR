import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor() {}

  public get(): any[] {
    return [
      {
        name: 'Luna',
        initials: 'Lu',
      },
      {
        name: 'Wrax',
        initials: 'Wr',
      },
      {
        name: 'Dicham',
        initials: 'Dc',
      },
      {
        name: 'Rakar',
        initials: 'Ra',
      },
      {
        name: "Saud'ho",
        initials: 'Sa',
      },
      {
        name: 'Xavro',
        initials: 'Xa',
      },
    ];
  }
}
