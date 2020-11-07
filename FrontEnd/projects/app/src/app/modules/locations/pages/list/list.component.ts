import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteDataService } from 'projects/app/src/app/shared/services/route-data.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public items: Location[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private routeDataService: RouteDataService) {}

  ngOnInit() {
    this.items = this.routeDataService.getItems(this.route);
  }

  public onEditClick(item: any): void {
    this.router.navigate(['../edit', item.id], {
      relativeTo: this.route,
    });
  }
}
