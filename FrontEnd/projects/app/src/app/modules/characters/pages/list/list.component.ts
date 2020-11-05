import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteDataService } from 'projects/app/src/app/shared/services/route-data.service';

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
