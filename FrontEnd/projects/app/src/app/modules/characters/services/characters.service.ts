import { Injectable } from '@angular/core';
import { Character } from '../models/Character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor() {}

  public get(id: number): Character {
    const result = new Character();
    result.id = id;
    result.name = 'Anakin Skywalker';
    result.src =
      'https://www.drawinghowtodraw.com/drawing-lessons/sci-fi-science-fiction/images/image130.jpg';

    return result;
  }

  public getAll(): Character[] {
    return [
      {
        id: 1,
        name: 'Anakin Skywalker',
        src:
          'https://vignette.wikia.nocookie.net/theclonewiki/images/c/ca/Anakin_skywalker_tcws03.png/revision/latest?cb=20120310130032',
      },
      {
        id: 2,
        name: 'Yoda',
        src:
          'https://i.pinimg.com/originals/df/5f/44/df5f44445efa0164abd9a9555409a44a.png',
      },
      {
        id: 3,
        name: 'Obi-Wan Kenobi',
        src: 'https://i.redd.it/abrntr2y56h11.jpg',
      },
      {
        id: 4,
        name: 'Dark Maul',
        src:
          'https://i.pinimg.com/originals/9f/b3/e6/9fb3e6296e70fee6abcffd719d6f9f94.png',
      },
      {
        id: 5,
        name: 'Savage Opress',
        src:
          'https://i.pinimg.com/originals/01/c5/df/01c5df2a8781dd7eecff0ac5d414f90f.png',
      },
      {
        id: 6,
        name: 'Embo',
        src: 'https://wiki.swgoh.help/images/7/70/Unit-Character-Embo.png',
      },
      {
        id: 7,
        name: 'Naga Mordow',
        src:
          'https://vignette.wikia.nocookie.net/starwars/images/9/9c/Sith_Pureblood.jpg/revision/latest?cb=20101211095235',
      },
      {
        id: 8,
        name: 'Captain Orga',
        src:
          'https://vignette.wikia.nocookie.net/starwars/images/5/52/Farghul_UAA.jpg/revision/latest/scale-to-width-down/340?cb=20071217035409',
      },
      {
        id: 9,
        name: 'EZ',
        src:
          'data:image/jpeg;base64,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',
      },
    ];
  }
}
