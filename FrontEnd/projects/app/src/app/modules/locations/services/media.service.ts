import { Injectable } from '@angular/core';
import { Media } from '../models/media';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor() {}

  public get(): Media[] {
    return [
      {
        url: '../../../../../assets/img/flaw.png',
      },
      {
        url: '../../../../../assets/img/ground.jpg',
      },
      {
        url: '../../../../../assets/img/mountain_1.png',
      },
      {
        url: '../../../../../assets/img/water.jpg',
      },
    ];
  }
}
