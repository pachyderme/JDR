import { Injectable } from '@angular/core';
import { Select } from '../../scenarios/models/select';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  constructor() {}

  public getFonts(): Select[] {
    return [
      {
        value: 'arial',
        displayValue: 'Arial',
      },
      {
        value: 'helvetica',
        displayValue: 'Helvetica',
      },
      {
        value: 'verdana',
        displayValue: 'Verdana',
      },
      {
        value: 'courier',
        displayValue: 'Courier',
      },
      {
        value: 'Roboto',
        displayValue: 'Roboto',
      },
      {
        value: 'Open Sans',
        displayValue: 'Open Sans',
      },
      {
        value: 'Zilla Slab',
        displayValue: 'Zilla Slab',
      },
      {
        value: 'Lato',
        displayValue: 'Lato',
      },
      {
        value: 'Bellefair',
        displayValue: 'Bellefair',
      },
      {
        value: 'Fresca',
        displayValue: 'Fresca',
      },
      {
        value: 'Raleway',
        displayValue: 'Raleway',
      },
      {
        value: 'Indie Flower',
        displayValue: 'Indie Flower',
      },
      {
        value: 'Josefin Sans',
        displayValue: 'Josefin Sans',
      },
      {
        value: 'Inconsolata',
        displayValue: 'Inconsolata',
      },
      {
        value: 'Pacifico',
        displayValue: 'Pacifico',
      },
      {
        value: 'Gloria Hallelujah',
        displayValue: 'Gloria Hallelujah',
      },
    ];
  }

  public changeBrushShadow(canvas: FabricjsEditorComponent): void {
    canvas.changeBrushShadow();
  }

  public changeBrushWidth(canvas: FabricjsEditorComponent): void {
    canvas.changeBrushWidth();
  }

  public changeBrushColor(canvas: FabricjsEditorComponent): void {
    canvas.changeBrushColor();
  }

  public addTextZone(canvas: FabricjsEditorComponent): void {
    canvas.textString = 'My text';
    canvas.addText();
  }

  public addFigure(figure, canvas: FabricjsEditorComponent): void {
    canvas.addFigure(figure);
  }

  public exportToBase64(canvas: FabricjsEditorComponent): void {
    canvas.exportToBase64();
  }

  public exportToSVG(canvas: FabricjsEditorComponent): void {
    canvas.exportToSVG();
  }

  public addImage(url: string, canvas: FabricjsEditorComponent): void {
    canvas.addImageOnCanvas(url);
  }

  public loadCanvasFromJSON(canvas: FabricjsEditorComponent): void {
    canvas.loadCanvasFromJSON();
  }

  public confirmClear(canvas: FabricjsEditorComponent): void {
    canvas.confirmClear();
  }

  public save(canvas: FabricjsEditorComponent): void {
    canvas.saveCanvasToJSON();
  }

  public removeSelected(canvas: FabricjsEditorComponent): void {
    canvas.removeSelected();
  }

  public sendToBack(canvas: FabricjsEditorComponent): void {
    canvas.sendToBack();
  }

  public bringToFront(canvas: FabricjsEditorComponent): void {
    canvas.bringToFront();
  }

  public clone(canvas: FabricjsEditorComponent): void {
    canvas.clone();
  }

  public cleanSelect(canvas: FabricjsEditorComponent): void {
    canvas.cleanSelect();
  }

  public setBackgroundFill(canvas: FabricjsEditorComponent): void {
    canvas.setBackgroundColor();
  }

  public setBackgroundImage(canvas: FabricjsEditorComponent): void {
    canvas.setBackgroundImage();
  }

  public setId(canvas: FabricjsEditorComponent): void {
    canvas.setId();
  }

  public setOpacity(canvas: FabricjsEditorComponent): void {
    canvas.setOpacity();
  }

  public setFill(canvas: FabricjsEditorComponent): void {
    canvas.setFill();
  }

  public setFontFamily(canvas: FabricjsEditorComponent): void {
    canvas.setFontFamily();
  }

  public setTextAlign(value: any, canvas: FabricjsEditorComponent): void {
    canvas.setTextAlign(value);
  }

  public setBold(canvas: FabricjsEditorComponent): void {
    canvas.setBold();
  }

  public setFontStyle(canvas: FabricjsEditorComponent): void {
    canvas.setFontStyle();
  }

  public hasTextDecoration(
    value: any,
    canvas: FabricjsEditorComponent
  ): boolean {
    return canvas.hasTextDecoration(value);
  }

  public setTextDecoration(value: any, canvas: FabricjsEditorComponent): void {
    canvas.setTextDecoration(value);
  }

  public setFontSize(canvas: FabricjsEditorComponent): void {
    canvas.setFontSize();
  }

  public setLineHeight(canvas: FabricjsEditorComponent): void {
    canvas.setLineHeight();
  }

  public setCharSpacing(canvas: FabricjsEditorComponent): void {
    canvas.setCharSpacing();
  }

  public exportToJSON(canvas: FabricjsEditorComponent): void {
    canvas.exportToJSON();
  }

  public setDrawingMode(value: boolean, canvas: FabricjsEditorComponent): void {
    canvas.setDrawingMode(value);
  }
}
