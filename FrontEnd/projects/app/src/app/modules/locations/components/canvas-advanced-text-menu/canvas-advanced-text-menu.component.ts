import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Text } from 'projects/fabricjs-editor/src/lib/models/Text';
import { Select } from '../../../scenarios/models/select';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-canvas-advanced-text-menu',
  templateUrl: './canvas-advanced-text-menu.component.html',
  styleUrls: ['./canvas-advanced-text-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasAdvancedTextMenuComponent implements OnInit {
  public fonts: Select[] = [];

  @Input() selectedObject: Text;

  @Output() onFontFamilyChange: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() onTextAlignChange: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() onBoldChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onItalicChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onUnderlineChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output() onLineThroughChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output() onFontSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onLineHeightChange: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() onCharSpacingChange: EventEmitter<number> = new EventEmitter<
    number
  >();

  constructor(private canvasService: CanvasService) {}

  ngOnInit() {
    this.fonts = this.canvasService.getFonts();
  }

  public onRequestFontFamilyChange(): void {
    this.onFontFamilyChange.emit(this.selectedObject.fontFamily);
  }

  public onRequestTextAlign(value: string): void {
    this.onTextAlignChange.emit(value);
  }

  public onRequestBold(): void {
    this.onBoldChange.emit(!this.selectedObject.bold);
  }

  public onRequestItalic(): void {
    this.onItalicChange.emit(!this.selectedObject.italic);
  }

  public onRequestUnderline(): void {
    this.onUnderlineChange.emit(!this.selectedObject.underline);
  }

  public onRequestLineThrough(): void {
    this.onLineThroughChange.emit(!this.selectedObject.lineThrough);
  }

  public onRequestFontSizeChange(): void {
    this.onFontSizeChange.emit(this.selectedObject.fontSize);
  }

  public onRequestLineHeightChange(): void {
    this.onLineHeightChange.emit(this.selectedObject.lineHeight);
  }

  public onRequestCharSpacingChange(): void {
    this.onCharSpacingChange.emit(this.selectedObject.charSpacing);
  }
}
