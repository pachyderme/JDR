import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Brush } from 'projects/fabricjs-editor/src/lib/models/Brush';

@Component({
  selector: 'app-canvas-advanced-brush-menu',
  templateUrl: './canvas-advanced-brush-menu.component.html',
  styleUrls: ['./canvas-advanced-brush-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasAdvancedBrushMenuComponent implements OnInit {
  //#region Inputs

  @Input() brush: Brush;

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
  @Output() onTextureChange: EventEmitter<string> = new EventEmitter<string>();

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

  public onRequestTextureChange(): void {
    this.onTextureChange.emit(this.brush.textureImagePath);
  }
}
