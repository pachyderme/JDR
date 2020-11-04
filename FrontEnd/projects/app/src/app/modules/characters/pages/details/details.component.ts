import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/Character';
import { RouteDataService } from 'projects/app/src/app/shared/services/route-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public item: Character;

  constructor(
    private route: ActivatedRoute,
    private routeDataService: RouteDataService
  ) {}

  ngOnInit() {
    this.item = this.routeDataService.getItem(this.route);
  }
}
