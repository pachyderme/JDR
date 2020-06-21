import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-canvas-draw-menu',
  templateUrl: './canvas-draw-menu.component.html',
  styleUrls: ['./canvas-draw-menu.component.scss'],
})
export class CanvasDrawMenuComponent implements OnInit {
  //#region Inputs

  @Input() drawing: boolean;

  //#endregion

  //#region Outputs

  @Output() onDrawingChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  @Output() onAddFigureClick: EventEmitter<string> = new EventEmitter<string>();

  @Output() onAddTextClick: EventEmitter<void> = new EventEmitter<void>();

  //#endregion

  constructor() {}

  ngOnInit() {}

  public onMoveClick(): void {
    this.onDrawingChange.emit(false);
  }

  public onBrushClick(): void {
    this.onDrawingChange.emit(true);
  }

  public onFigureClick(item: string): void {
    this.onAddFigureClick.emit(item);
    this.onDrawingChange.emit(false);
  }

  public onTextClick(): void {
    this.onAddTextClick.emit();
    this.onDrawingChange.emit(false);
  }
}
