import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { IEditableObject } from 'projects/fabricjs-editor/src/lib/models/IEditableObject';

@Component({
  selector: 'app-canvas-header',
  templateUrl: './canvas-header.component.html',
  styleUrls: ['./canvas-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasHeaderComponent {
  //#region Inputs

  @Input() selectedObject: IEditableObject;

  @Input() canUndo: boolean;

  @Input() canRedo: boolean;

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
  @Output() onUndo: EventEmitter<void> = new EventEmitter<void>();
  @Output() onRedo: EventEmitter<void> = new EventEmitter<void>();

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

  public onUndoClick(): void {
    this.onUndo.emit();
  }

  public onRedoClick(): void {
    this.onRedo.emit();
  }

  public hasSelectedObject(): boolean {
    return this.selectedObject != null;
  }
}
