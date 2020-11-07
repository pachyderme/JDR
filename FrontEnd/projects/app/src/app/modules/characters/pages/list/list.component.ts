import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Character, RouteDataService } from '@core-api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public items: Character[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routeDataService: RouteDataService
  ) {}

  ngOnInit() {
    this.items = this.routeDataService.getItems(this.route);
  }

  public onEditClick(item: Character): void {
    this.router.navigate(['../details', item.id], {
      relativeTo: this.route,
    });
  }
}
