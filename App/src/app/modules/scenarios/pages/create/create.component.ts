import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StartWithPipe } from 'src/app/shared/pipes/start-with.pipe';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public currentStepIndex = 0;

  public baseForm: FormGroup;
  public advanceForm: FormGroup;
  public charactersForm: FormGroup;
  public templateForm: FormGroup;
  public univers: any[] = [];
  public characters: any[] = [];
  public selectedCharacters: any[] = [];
  public templates: any[] = [];
  public selectedTemplate: any;
  public selectedUnivers: any;

  constructor(
    private formBuilder: FormBuilder,
    private startWithPipe: StartWithPipe,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.baseForm = this.formBuilder.group({
      name: [''],
      summary: [''],
      goal: [''],
    });

    this.univers.push(
      {
        label: 'Dungeons and dragons',
        initials: 'DD',
      },
      {
        label: 'Lord of the rings',
        initials: 'LR',
      },
      {
        label: 'Star wars - Clone wars',
        initials: 'SW',
      },
      {
        label: 'Star wars - Rebels',
        initials: 'SW',
      },
      {
        label: "Star wars - The Great Sith's war",
        initials: 'SW',
      },
      {
        label: 'Star wars - The old republic',
        initials: 'SW',
      },
      {
        label: 'Warhammer',
        initials: 'WH',
      },
      {
        label: 'Warhammer 40k',
        initials: 'WH',
      }
    );

    this.advanceForm = this.formBuilder.group({
      univers: [''],
      image: [''],
    });

    this.characters = [
      {
        name: 'Luna',
        initials: 'Lu',
      },
      {
        name: 'Wrax',
        initials: 'Wr',
      },
      {
        name: 'Dicham',
        initials: 'Dc',
      },
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
    ];

    this.charactersForm = this.formBuilder.group({
      characters: [''],
    });

    this.templates = [
      {
        value: 0,
        displayValue: 'None',
      },
      {
        value: 1,
        displayValue: 'Linear',
      },
      {
        value: 2,
        displayValue: 'Branches',
      },
      {
        value: 3,
        displayValue: 'Sandbox',
      },
      {
        value: 4,
        displayValue: 'Emerging',
      },
    ];
    this.templateForm = this.formBuilder.group({
      template: ['0'],
    });
  }

  public onStepActivated(index: number = 0) {
    this.changeCurrentStepIndex(index);
  }

  public onBaseFormSubmit() {
    this.changeCurrentStepIndex(this.currentStepIndex + 1);
  }

  public onAdvanceFormSubmit() {
    this.changeCurrentStepIndex(this.currentStepIndex + 1);
  }

  public onCharactersFormSubmit() {
    this.changeCurrentStepIndex(this.currentStepIndex + 1);
  }

  public onTemplateFormSubmit() {
    console.log('Create the scenario !');
    this.router.navigate(['../details', 0], {
      relativeTo: this.route,
    });
  }

  public universFilter(items: any[], search: string): any[] {
    if (this.startWithPipe) {
      return this.startWithPipe.transform(this.univers, search, 'label');
    } else {
      return this.univers;
    }
  }

  public charactersFilter(items: any[], search: string): any[] {
    if (this.startWithPipe) {
      return this.startWithPipe.transform(this.characters, search, 'name');
    } else {
      return this.characters;
    }
  }

  private changeCurrentStepIndex(index: number) {
    this.currentStepIndex = index;
  }
}
