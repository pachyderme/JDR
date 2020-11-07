import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {

  private items: Location[] = [
    {
      id: 1,
      name: "Lothal : Jedi's temple",
      backgroundImage: '../../../../../assets/img/ground.jpg',
      src: "https://static.wikia.nocookie.net/frstarwars/images/a/ab/Temple_Jedi_de_Lothal.png"
    },
    {
      id: 2,
      name: "Jeddhal : Jeddah City",
      backgroundImage: '../../../../../assets/img/ground.jpg',
      src: "https://lumiere-a.akamaihd.net/v1/images/holy-city-of-jedha-main_a628115c.jpeg"
    },
    {
      id: 3,
      name: "Ryloth",
      backgroundImage: '../../../../../assets/img/ground.jpg',
      src: "https://lumiere-a.akamaihd.net/v1/images/databank_ryloth_01_169_02c0f2c0.jpeg"
    },
    {
      id: 4,
      name: "Korriban",
      backgroundImage: '../../../../../assets/img/ground.jpg',
      src: "https://static.wikia.nocookie.net/frstarwars/images/c/c7/Acad%C3%A9mie_Sith_de_Korriban.jpg"
    },
    {
      id: 5,
      name: "Kamino",
      backgroundImage: '../../../../../assets/img/water.jpg',
      src: "https://www.starwars-universe.com/images/encyclopedie/lieux_et_edifices/images_v6/complexe_tipoca_imv6.jpg"
    }
  ]

  constructor() {}

  public get(id: number): Observable<Location> {
    const result = this.items.find((item) => item.id === id);

    return of(result);
  }

  public list(): Observable<Location[]> {
    return of(this.items);
  }
}
