import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../locations/models/location';

@Component({
  selector: 'app-canvas-creation-menu',
  templateUrl: './canvas-creation-menu.component.html',
  styleUrls: ['./canvas-creation-menu.component.scss'],
})
export class CanvasCreationMenuComponent implements OnInit {
  @Input() locations: any[] = [];

  @Input() ressources: any[] = [];

  @Output() locationClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() locationEditClick: EventEmitter<number> = new EventEmitter<
    number
  >();

  @Output() ressourceClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() ressourceEditClick: EventEmitter<number> = new EventEmitter<
    number
  >();

  @Output() addEmptyNodeClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() addTextClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public onLocationClick(location: any): void {
    this.locationClick.emit(location);
  }

  public onLocationEditClick(id: number): void {
    this.locationEditClick.emit(id);
  }

  public onRessourceClick(ressource: any): void {
    this.ressourceClick.emit(ressource);
  }

  public onRessourceEditClick(id: number): void {
    this.ressourceEditClick.emit(id);
  }

  public onAddEmptyNodeClick(event: MouseEvent): void {
    this.addEmptyNodeClick.emit();
  }

  public onAddTextClick(event: MouseEvent): void {
    this.addTextClick.emit();
  }
}
