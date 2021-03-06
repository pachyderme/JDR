import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteDataService } from '@core-api';
import { Scenario } from '../../models/scenario';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public title: string = 'Card title';
  public subtitle: string = 'Subtitle';
  public text: string =
    'To make a contribution to the world by making tools for the mind that advance humankind.';
  public src: string = 'https://picsum.photos/900/500';
  public items: Scenario[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routeDataService: RouteDataService
  ) {}

  ngOnInit() {
    this.items = this.routeDataService.getItems(this.route);
  }

  public getTime(): string {
    return performance.now().toString();
  }

  public getSrc(): string {
    return this.src + '?' + this.getTime();
  }

  public onEditClick(item: any): void {
    this.router.navigate(['../details', item.id], {
      relativeTo: this.route,
    });
  }
}
