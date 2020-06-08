import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UniversService } from '../../services/univers.service';
import { CharactersService } from '../../services/characters.service';
import { TemplatesService } from '../../services/templates.service';
import { StartWithPipe } from 'projects/app/src/app/shared/pipes/start-with.pipe';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public scenario: any;
  public summaryForm: FormGroup;

  public universes: any[] = [];
  public characters: any[] = [];
  public templates: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private startWithPipe: StartWithPipe,
    private universService: UniversService,
    private charactersService: CharactersService,
    private templatesService: TemplatesService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.universes = this.universService.get();
    this.characters = this.charactersService.get();
    this.templates = this.templatesService.get();

    this.scenario = {
      id,
      name: `Scenario (${id})`,
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
          name: "Mar'Salma",
          comment: 'A planet',
        },
        {
          name: 'Norval II',
          comment: 'A planet',
        },
        {
          name: "Naga Mordow's palace",
          comment: 'The Naga Mordow house',
        },
      ],
      ressources: [
        {
          name: 'Naga Mordow',
          comment: 'The chief of the convervators',
        },
        {
          name: 'EZ-1',
          comment: 'The Xavro droid',
        },
        {
          name: 'Captain Orga',
          comment: 'The captain of the players ship',
        },
      ],
    };

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
    this.router.navigate(['locations/edit', id]);
  }
}
