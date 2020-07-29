import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  public items: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    for (let i = 0; i < 4; i++) {
      this.items.push({ src: this.getSrc(), id: i });
    }
  }

  public getTime(): string {
    return performance.now().toString();
  }

  public getSrc(): string {
    return this.src + '?' + this.getTime();
  }

  public onEditClick(item: any): void {
    this.router.navigate(['../edit', item.id], {
      relativeTo: this.route,
    });
  }
}
