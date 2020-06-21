import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Brush } from 'projects/fabricjs-editor/src/lib/models/Brush';

@Component({
  selector: 'app-canvas-advanced-brush-menu',
  templateUrl: './canvas-advanced-brush-menu.component.html',
  styleUrls: ['./canvas-advanced-brush-menu.component.scss'],
})
export class CanvasAdvancedBrushMenuComponent implements OnInit {
  //#region Inputs

  private _brush: Brush;

  @Input() public set brush(value: Brush) {
    if (value) {
      this._brush = JSON.parse(JSON.stringify(value));
    } else {
      this._brush = null;
    }
  }

  public get brush(): Brush {
    return this._brush;
  }

  //#endregion

  //#region Outputs

  @Output() onBrushShadowColorChange: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() onBrushShadowWidthChange: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() onBrushWidthChange: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() onBrushColorChange: EventEmitter<string> = new EventEmitter<
    string
  >();

  //#endregion

  constructor() {}

  ngOnInit() {}

  public onRequestBrushShadowColorChange(): void {
    this.onBrushShadowColorChange.emit(this.brush.shadowColor);
  }

  public onRequestBrushShadowWidthChange(): void {
    this.onBrushShadowWidthChange.emit(this.brush.shadowWidth);
  }

  public onRequestBrushWidthChange(): void {
    this.onBrushWidthChange.emit(this.brush.width);
  }

  public onRequestBrushColorChange(): void {
    this.onBrushColorChange.emit(this.brush.color);
  }
}
