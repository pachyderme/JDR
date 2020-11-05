import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { RouteDataService } from 'projects/app/src/app/shared/services/route-data.service';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public mainForm: FormGroup;
  public item: Character;

  constructor(
    private route: ActivatedRoute,
    private routeDataService: RouteDataService,
    private formBuilder: RxFormBuilder
  ) {}

  ngOnInit() {
    this.item = this.routeDataService.getItem(this.route);
    this.mainForm = this.formBuilder.formGroup(Character, this.item);
  }
}
