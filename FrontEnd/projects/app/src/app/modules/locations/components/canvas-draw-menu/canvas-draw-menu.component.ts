import { Component, OnInit, Input } from '@angular/core';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-canvas-draw-menu',
  templateUrl: './canvas-draw-menu.component.html',
  styleUrls: ['./canvas-draw-menu.component.scss'],
})
export class CanvasDrawMenuComponent implements OnInit {
  @Input() canvas: FabricjsEditorComponent;

  constructor(private canvasService: CanvasService) {}

  ngOnInit() {}

  public onDrawMenuClick(item: string): void {
    this.selectMenuItem(item);
  }

  private selectMenuItem(item: string): void {
    switch (item) {
      case 'brush':
        this.selectBrush();
        break;
      case 'move':
        this.selectMove();
        break;
      case 'line':
      case 'square':
      case 'triangle':
      case 'circle':
      case 'rectangle':
        this.addFigure(item);
        break;
      case 'text':
        this.addText();
        break;
    }

    if (item !== 'brush') {
      this.canvas.setDrawingMode(false);
    }
  }

  private addText(): void {
    this.canvasService.addTextZone(this.canvas);
  }

  private addFigure(form: string): void {
    this.canvasService.addFigure(form, this.canvas);
  }

  private selectBrush(): void {
    if (this.canvas.selected) {
      this.canvasService.cleanSelect(this.canvas);
      this.canvasService.setDrawingMode(true, this.canvas);
    } else {
      this.canvasService.setDrawingMode(!this.canvas.drawing, this.canvas);
    }
  }

  private selectMove(): void {
    this.canvasService.setDrawingMode(false, this.canvas);
  }
}
