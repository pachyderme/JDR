import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public items = [];
  public selectedItem: any;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        src:
          'https://www.black-book-editions.fr/contenu/image/Images_divers/JDR_Dungeons_and_dragons/DD5_logo_2_v1.png',
        label: 'Dungeons and dragons',
        description: 'DD',
      },
      {
        src:
          'https://comicconbrussels.com/wp-content/uploads/2020/01/Lord-of-the-Rings-1.png',
        label: 'Lord of the rings',
        description: 'LR',
      },
      {
        src:
          'https://vignette.wikia.nocookie.net/theclonewiki/images/8/89/Star_Wars_The_Clone_Wars_Logo.png/revision/latest/scale-to-width-down/340?cb=20200331235250',
        label: 'Star wars - Clone wars',
        description: 'SW',
      },
      {
        src:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_Star_Wars_Rebels_schwarz.svg/1280px-Logo_Star_Wars_Rebels_schwarz.svg.png',
        label: 'Star wars - Rebels',
        description: 'SW',
      },
      {
        src:
          'https://boutique.orange.fr/accessoire-connecte/univers-starwars/img/logo-noir.png',
        label: "Star wars - The Great Sith's war",
        description: 'SW',
      },
      {
        src:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/SW-TOR-logo.png/1200px-SW-TOR-logo.png',
        label: 'Star wars - The old republic',
        description: 'SW',
      },
      {
        src:
          'https://www.forbiddenpower.com/wp-content/uploads/2016/08/Warhammer-Logo.png',
        label: 'Warhammer',
        description: 'WH',
      },
      {
        src:
          'https://1d4chan.org/images/thumb/8/82/40k_NewLogo_1000px.png/700px-40k_NewLogo_1000px.png',
        label: 'Warhammer 40k',
        description: 'WH',
      },
    ];
  }

  public onUniversClick(item: any): void {
    this.selectedItem = item;
  }
}
