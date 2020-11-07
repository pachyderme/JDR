import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StartWithPipe, RouteDataService, Character } from '@core-api';
import { IEditableObject, FabricjsEditorComponent } from '@fabricjs-editor';
import { CanvasService } from '../../../locations/services/canvas.service';
import { Scenario } from '../../models/scenario';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  public item: Scenario;
  public scenario: any;
  public summaryForm: FormGroup;

  public universes: any[] = [];
  public characters: Character[] = [];
  public templates: any[] = [];

  public backgroundImagePath: string;
  @ViewChild('canvas', { static: false }) canvas: FabricjsEditorComponent;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private startWithPipe: StartWithPipe,
    private router: Router,
    private canvasService: CanvasService,
    private routeDataService: RouteDataService
  ) {}

  ngOnInit() {
    this.item = this.routeDataService.getItem(this.route);
    this.universes = this.routeDataService.get('univers', this.route);
    this.characters = this.routeDataService.get('characters', this.route);
    this.templates = this.routeDataService.get('templates', this.route);

    this.scenario = {
      universe: {
        label: "Star wars - The Great Sith's war",
        initials: 'SW',
      },
      summary: 'My summary',
      goal: 'My goal',
      image:
        'https://th.bing.com/th/id/OIP.WvMfQhTYEpL6SCMpLfDBoAHaJQ?pid=Api&rs=1',
      characters: [
        {
          name: 'Rakar',
          initials: 'Ra',
        },
        {
          name: "Saud'ho",
          initials: 'Sa',
        },
        {
          name: 'Xavro',
          initials: 'Xa',
        },
      ],
      template: {
        value: 2,
        displayValue: 'Branches',
      },
      locations: [
        {
          id: 0,
          name: "Mar'Salma",
          comment: 'A planet',
        },
        {
          id: 1,
          name: 'Norval II',
          comment: 'A planet',
        },
        {
          id: 2,
          name: "Naga Mordow's palace",
          comment: 'The Naga Mordow house',
        },
      ],
      ressources: [
        {
          id: 0,
          name: 'Naga Mordow',
          comment: 'The chief of the convervators',
        },
        {
          id: 1,
          name: 'EZ-1',
          comment: 'The Xavro droid',
        },
        {
          id: 2,
          name: 'Captain Orga',
          comment: 'The captain of the players ship',
        },
      ],
    };

    this.scenario = { ...this.scenario, ...this.item };

    this.summaryForm = this.formBuilder.group({
      name: [this.scenario.name],
      summary: [this.scenario.summary],
      goal: [this.scenario.goal],
      universe: [this.scenario.universe],
      image: [this.scenario.image],
      characters: [this.scenario.characters],
      template: [this.scenario.template],
    });
  }

  public ngAfterViewInit(): void {}

  public universesFilter(items: any[], search: string): any[] {
    if (this.startWithPipe) {
      return this.startWithPipe.transform(this.universes, search, 'label');
    } else {
      return this.universes;
    }
  }

  public charactersFilter(items: any[], search: string): any[] {
    if (this.startWithPipe) {
      return this.startWithPipe.transform(this.characters, search, 'name');
    } else {
      return this.characters;
    }
  }

  public onLocationEditClick(id: number): void {
    if (id == null) {
      id = 0;
    }

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['locations/edit', id])
    );
    window.open(url, '_blank');
  }

  public onRessourceEditClick(id: number): void {
    if (id == null) {
      id = 0;
    }

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['ressource/edit', id])
    );
    window.open(url, '_blank');
  }

  public onSelectObject(event: IEditableObject): void {}

  public onSelectedObjectUpdated(event: IEditableObject): void {}

  public onCanUndoChange(value: boolean): void {}

  public onCanRedoChange(value: boolean): void {}

  public onAddLocation(value: any): void {
    this.canvasService.addFigure('triangle', this.canvas);
  }

  public onAddRessource(value: any): void {
    this.canvasService.addFigure('rectangle', this.canvas);
  }

  public onAddEmptyNode(): void {
    this.canvasService.addFigure('circle', this.canvas);
  }

  public onAddText(): void {
    this.canvasService.addTextZone('Text', this.canvas);
  }
}
