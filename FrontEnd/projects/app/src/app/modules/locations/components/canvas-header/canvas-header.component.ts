import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';
import { CanvasService } from '../../services/canvas.service';
import { Key } from 'ts-keycode-enum';
import { IEditableObject } from 'projects/fabricjs-editor/src/lib/models/IEditableObject';

@Component({
  selector: 'app-canvas-header',
  templateUrl: './canvas-header.component.html',
  styleUrls: ['./canvas-header.component.scss'],
})
export class CanvasHeaderComponent {
  //#region Inputs

  private _selectedObject: IEditableObject;

  @Input() public set selectedObject(value: IEditableObject) {
    if (value) {
      this._selectedObject = JSON.parse(JSON.stringify(value));
    } else {
      this._selectedObject = null;
    }
  }

  public get selectedObject(): IEditableObject {
    return this._selectedObject;
  }

  //#endregion

  //#region Outputs

  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLoad: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();
  @Output() onRemove: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSendToBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBringToFront: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClone: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCleanSelect: EventEmitter<void> = new EventEmitter<void>();

  //#endregion

  constructor() {}

  public onSaveClick(): void {
    this.onSave.emit();
  }

  public onLoadClick(): void {
    this.onLoad.emit();
  }

  public onClearClick(): void {
    this.onClear.emit();
  }

  public onRemoveClick(): void {
    this.onRemove.emit();
  }

  public onSendToBackClick(): void {
    this.onSendToBack.emit();
  }

  public onBringToFrontClick(): void {
    this.onBringToFront.emit();
  }

  public onCloneClick(): void {
    this.onClone.emit();
  }

  public onCleanSelectClick(): void {
    this.onCleanSelect.emit();
  }

  public hasSelectedObject(): boolean {
    return this.selectedObject != null;
  }
}
