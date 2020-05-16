import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StartWithPipe } from 'src/app/shared/pipes/start-with.pipe';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public currentStepIndex = 0;

  public baseForm: FormGroup;
  public advanceForm: FormGroup;
  public locationsForm: FormGroup;
  public templateForm: FormGroup;
  public items: any[] = [];
  public itemsSelected: any[] = [];
  public itemSelected: any;

  constructor(
    private formBuilder: FormBuilder,
    private startWithPipe: StartWithPipe
  ) {}

  ngOnInit() {
    this.baseForm = this.formBuilder.group({
      name: [''],
      summary: [''],
      goal: [''],
    });

    this.advanceForm = this.formBuilder.group({
      univers: [''],
    });

    this.locationsForm = this.formBuilder.group({});
    this.templateForm = this.formBuilder.group({});

    this.items.push(
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

    this.itemsSelected.push(this.items[0]);
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

  public onLocationsFormSubmit() {
    this.changeCurrentStepIndex(this.currentStepIndex + 1);
  }

  public onTemplateFormSubmit() {
    console.log('Create the scenario !');
  }

  public itemsFilter(items: any[], search: string): any[] {
    if (this.startWithPipe) {
      return this.startWithPipe.transform(this.items, search, 'label');
    } else {
      return this.items;
    }
  }

  private changeCurrentStepIndex(index: number) {
    this.currentStepIndex = index;
  }
}
