import { Injectable } from '@angular/core';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor() {}

  public get(id: number): Location {
    const result = new Location();
    result.id = id;
    result.name = "Mar'Salma";
    result.backgroundImage = '../../../../../assets/img/water.jpg';

    return result;
  }
}
