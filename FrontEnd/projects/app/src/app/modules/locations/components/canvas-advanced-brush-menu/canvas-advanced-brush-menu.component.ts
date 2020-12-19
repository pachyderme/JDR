import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Brush } from '@fabricjs-editor';

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

  @Output() onBrushShadowColorChange = new EventEmitter<string>();
  @Output() onBrushShadowWidthChange = new EventEmitter<number>();
  @Output() onBrushWidthChange = new EventEmitter<number>();
  @Output() onBrushColorChange = new EventEmitter<string>();
  @Output() onBrushTextureChange = new EventEmitter<string>();

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

  public onRequestBrushTextureChange(): void {
    this.onBrushTextureChange.emit(this.brush.textureImagePath);
  }
}
