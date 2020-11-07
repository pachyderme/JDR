import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Scenario } from '../models/scenario';

@Injectable({
  providedIn: 'root',
})
export class ScenariosService {
  private items: Scenario[] = [
    {
      id: 1,
      name: "Le destin d'une galaxie : I",
      imageUrl:
        'https://tra.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fbin.2F2020.2F04.2F06.2F1ae1a3d0-4dc4-4cde-9d59-4ef1d1225b64.2Ejpeg/812x609/background-color/ffffff/quality/70/voici-les-films-et-series-star-wars-que-vous-pouvez-voir-sur-disney.jpg',
      charactersIds: [1, 2, 3],
      template: {
        value: 2,
        displayValue: 'Branches',
      },
      locationsIds: [1, 2],
      ressourcesIds: [1, 2],
    },
    {
      id: 2,
      name: "Le destin d'une galaxie: II",
      imageUrl:
        'https://tra.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fbin.2F2020.2F04.2F06.2F1ae1a3d0-4dc4-4cde-9d59-4ef1d1225b64.2Ejpeg/812x609/background-color/ffffff/quality/70/voici-les-films-et-series-star-wars-que-vous-pouvez-voir-sur-disney.jpg',
    },
    {
      id: 3,
      name: "Le destin d'une galaxie: III",
      imageUrl:
        'https://tra.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fbin.2F2020.2F04.2F06.2F1ae1a3d0-4dc4-4cde-9d59-4ef1d1225b64.2Ejpeg/812x609/background-color/ffffff/quality/70/voici-les-films-et-series-star-wars-que-vous-pouvez-voir-sur-disney.jpg',
    },
    {
      id: 4,
      name: 'La croisade de la force',
      imageUrl:
        'https://tra.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fbin.2F2020.2F04.2F06.2F1ae1a3d0-4dc4-4cde-9d59-4ef1d1225b64.2Ejpeg/812x609/background-color/ffffff/quality/70/voici-les-films-et-series-star-wars-que-vous-pouvez-voir-sur-disney.jpg',
    },
  ];

  constructor() {}

  public get(id: number): Observable<Scenario> {
    const result = this.items.find((item) => item.id === id);

    return of(result);
  }

  public list(): Observable<Scenario[]> {
    return of(this.items);
  }
}
