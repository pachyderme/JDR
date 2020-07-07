import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/Character';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public items: Character[] = [];

  constructor(
    private charactersService: CharactersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.items = this.charactersService.getAll();
  }

  public onEditClick(item: Character): void {
    this.router.navigate(['../details', item.id], {
      relativeTo: this.route,
    });
  }
}
