import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StartWithPipe } from 'src/app/shared/pipes/start-with.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { UniversService } from '../../services/univers.service';
import { CharactersService } from '../../services/characters.service';
import { TemplatesService } from '../../services/templates.service';

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
  public universes: any[] = [];
  public characters: any[] = [];
  public selectedCharacters: any[] = [];
  public templates: any[] = [];
  public selectedTemplate: any;
  public selectedUniverse: any;

  constructor(
    private formBuilder: FormBuilder,
    private startWithPipe: StartWithPipe,
    private router: Router,
    private route: ActivatedRoute,
    private universService: UniversService,
    private charactersService: CharactersService,
    private templatesService: TemplatesService
  ) {}

  ngOnInit() {
    this.baseForm = this.formBuilder.group({
      name: [''],
      summary: [''],
      goal: [''],
    });

    this.universes = this.universService.get();

    this.advanceForm = this.formBuilder.group({
      universe: [''],
      image: [''],
    });

    this.characters = this.charactersService.get();

    this.charactersForm = this.formBuilder.group({
      characters: [''],
    });

    this.templates = this.templatesService.get();
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

  private changeCurrentStepIndex(index: number) {
    this.currentStepIndex = index;
  }
}
