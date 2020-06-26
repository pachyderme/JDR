import { Injectable } from '@angular/core';
import { Select } from '../../scenarios/models/select';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';
import { IEditableObject } from 'projects/fabricjs-editor/src/lib/models/IEditableObject';

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

  //#region Add

  public addTextZone(text: string, canvas: FabricjsEditorComponent): void {
    canvas.addText(text);
  }

  public addFigure(figure: string, canvas: FabricjsEditorComponent): void {
    canvas.addFigure(figure);
  }

  public addImage(url: string, canvas: FabricjsEditorComponent): void {
    canvas.addImageOnCanvas(url);
  }

  //#endregion

  //#region Export

  public exportToBase64(canvas: FabricjsEditorComponent): string {
    return canvas.exportToBase64();
  }

  public exportToSVG(canvas: FabricjsEditorComponent): string {
    return canvas.exportToSVG();
  }

  public exportToJSON(canvas: FabricjsEditorComponent): string {
    return canvas.exportToJSON();
  }

  //#endregion

  //#region State (save / load ...)

  public load(canvas: FabricjsEditorComponent): void {
    canvas.loadCanvasFromJSON();
  }

  public save(canvas: FabricjsEditorComponent): void {
    canvas.saveCanvasToJSON();
  }

  public clear(canvas: FabricjsEditorComponent): void {
    canvas.clear();
  }

  //#endregion

  //#region Selection

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

  //#endregion

  //#region Background

  public setBackgroundColor(
    color: string,
    canvas: FabricjsEditorComponent
  ): void {
    canvas.setBackgroundColor(color);
  }

  public setBackgroundImage(
    url: string,
    canvas: FabricjsEditorComponent
  ): void {
    canvas.setBackgroundImage(url);
  }

  //#endregion

  //#region Object properties

  //#region Setters

  public setBrushWidth(width: number, canvas: FabricjsEditorComponent): void {
    canvas.setBrushWidth(width);
  }

  public setBrushColor(color: string, canvas: FabricjsEditorComponent): void {
    canvas.setBrushColor(color);
  }

  public setId(id: string, canvas: FabricjsEditorComponent): void {
    canvas.setId(id);
  }

  public setOpacity(opacity: number, canvas: FabricjsEditorComponent): void {
    canvas.setOpacity(opacity);
  }

  public setFill(color: string, canvas: FabricjsEditorComponent): void {
    canvas.setFill(color);
  }

  public setUrl(url: string, canvas: FabricjsEditorComponent): void {
    canvas.setUrl(url);
  }

  public setFontFamily(
    fontFamily: string,
    canvas: FabricjsEditorComponent
  ): void {
    canvas.setFontFamily(fontFamily);
  }

  public setTextAlign(value: string, canvas: FabricjsEditorComponent): void {
    canvas.setTextAlign(value);
  }

  public setBold(value: boolean, canvas: FabricjsEditorComponent): void {
    canvas.setBold(value);
  }

  public setItalic(italic: boolean, canvas: FabricjsEditorComponent): void {
    canvas.setFontStyle(italic);
  }

  public setUnderline(value: boolean, canvas: FabricjsEditorComponent): void {
    canvas.setUnderline(value);
  }

  public setLinThrough(value: boolean, canvas: FabricjsEditorComponent): void {
    canvas.setLineThrough(value);
  }

  public setFontSize(size: number, canvas: FabricjsEditorComponent): void {
    canvas.setFontSize(size);
  }

  public setLineHeight(height: number, canvas: FabricjsEditorComponent): void {
    canvas.setLineHeight(height);
  }

  public setCharSpacing(
    spacing: number,
    canvas: FabricjsEditorComponent
  ): void {
    canvas.setCharSpacing(spacing);
  }

  public setDrawingMode(value: boolean, canvas: FabricjsEditorComponent): void {
    canvas.setDrawingMode(value);
  }

  //#endregion

  //#region Getters

  public getSelectedObject(canvas: FabricjsEditorComponent): IEditableObject {
    return canvas.getSelectedObject();
  }

  //#endregion

  //#region Utilities

  public hasTextDecoration(
    value: string,
    canvas: FabricjsEditorComponent
  ): boolean {
    return canvas.hasTextDecoration(value);
  }

  //#endregion

  //#endregion
}
