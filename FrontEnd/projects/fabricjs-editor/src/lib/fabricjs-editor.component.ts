import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { fabric } from 'fabric';
import {
  Figure,
  Brush,
  Text,
  IEditableObject,
  Image as EditableImage,
  Path as EditablePath,
  EditableObjectTypes,
  Marker,
  RemoveCommand,
  AddCommand,
  ModifiedCommand,
} from './models/public-api';
import { CommandsService } from './services/CommandsService';

@Component({
  selector: 'jdr-fabricjs-editor',
  templateUrl: './fabricjs-editor.component.html',
  styleUrls: ['./fabricjs-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabricjsEditorComponent implements AfterViewInit {
  //#region ViewChild

  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;
  @ViewChild('htmlCursorCanvas') htmlCursorCanvas: ElementRef;

  //#endregion

  //#region Outputs

  @Output() onSelectObject: EventEmitter<IEditableObject> = new EventEmitter<
    IEditableObject
  >();

  @Output() onSelectedObjectUpdated: EventEmitter<
    IEditableObject
  > = new EventEmitter<IEditableObject>();

  @Output() onCanUndoChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  @Output() onCanRedoChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  //#endregion

  //#region Inputs

  //#region Brush

  private _brush: Brush;

  @Input() public set brush(value: Brush) {
    if (value) {
      this._brush = JSON.parse(JSON.stringify(value));
      this.setBrushColor(this._brush.color);
      this.setBrushWidth(this._brush.width);
      this.setBrushShadow(this._brush.shadowColor, this._brush.shadowWidth);
    } else {
      this._brush = null;
    }
  }

  public get brush(): Brush {
    return this._brush;
  }

  //#endregion

  //#region Drawing

  private _drawing: boolean;

  @Input() public set drawing(value: boolean) {
    this._drawing = value;
    if (this.canvas) {
      this.setDrawingMode(value);
    }
  }

  public get drawing(): boolean {
    return this._drawing;
  }

  //#endregion

  //#endregion

  private canvas: fabric.Canvas;
  private selectedObject: IEditableObject;
  private drawingMouseCanvas: fabric.StaticCanvas;
  private drawingMouseCursorForm: fabric.Circle;
  private lastDrawedForm: fabric.Path;
  private lastDrawedStroke: fabric.Path;

  constructor(private commandsService: CommandsService) {}

  //#region Initializations

  public ngAfterViewInit(): void {
    this.initializeCanvas();
    this.initializeDrawingMouseCanvas();
    this.initializeResizing();
    this.initializeEvents();
  }

  private initializeCanvas(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: '#DDD',
      selectionColor: 'rgba(200, 200, 200, 0.25)',
      includeDefaultValues: true,
    });
  }

  private initializeDrawingMouseCanvas(): void {
    this.drawingMouseCanvas = new fabric.StaticCanvas(
      this.htmlCursorCanvas.nativeElement
    );
  }

  private initializeResizing(): void {
    window.onresize = (event) => {
      this.fitResponsiveCanvas();
    };

    setTimeout(() => {
      this.fitResponsiveCanvas();
    });
  }

  private initializeEvents(): void {
    this.canvas.on({
      'object:moving': (e) => {},
      'object:moved': (e) => {},
      'object:modified': this.onObjectModified.bind(this),
      'selection:updated': this.onSelectionUpdated.bind(this),
      'selection:created': this.onSelectionCreated.bind(this),
      'selection:cleared': this.onSelectionCleared.bind(this),
      'path:created': this.onPathCreated.bind(this),
      'mouse:down': this.onMouseDown.bind(this),
      'mouse:move': this.onMouseMove.bind(this),
      'mouse:out': this.onMouseOut.bind(this),
      'mouse:wheel': this.onMouseWheel.bind(this),
    });
  }

  //#endregion

  //#region Events

  //#region Objets

  private onObjectModified(e: fabric.IEvent): void {
    const current = {
      angle: e.target.angle,
      flipX: e.target.flipX,
      flipY: e.target.flipY,
      originX: e.target.originX,
      originY: e.target.originY,
      scaleX: e.target.scaleX,
      scaleY: e.target.scaleY,
      skewX: e.target.skewX,
      skewY: e.target.skewY,
      left: e.target.left,
      top: e.target.top,
    };

    const command = new ModifiedCommand(
      this.canvas,
      e.target,
      current,
      e.transform.original
    );
    this.commandsService.insert(command);
    this.updateUndoRedo();
  }

  //#endregion

  //#region Selection

  private onSelectionUpdated(e: fabric.IEvent): void {
    this.onSelection(e);
  }

  private onSelectionCreated(e: fabric.IEvent): void {
    this.onSelection(e);
  }

  private onSelectionCleared(e: fabric.IEvent): void {
    this.selectedObject = null;
    this.onSelectObject.emit(null);
  }

  private onSelection(e?: fabric.IEvent): void {
    const selectedObject = e
      ? (e.target as fabric.Object)
      : this.canvas.getActiveObject();
    selectedObject.hasRotatingPoint = true;
    selectedObject.transparentCorners = false;
    selectedObject.borderDashArray = [3, 3];
    selectedObject.borderColor = '#555';
    selectedObject.cornerColor = '#EEE';
    selectedObject.cornerStrokeColor = '#888';
    selectedObject.cornerStyle = 'circle';
    selectedObject.cornerSize = 15;

    const editableObject = this.getSelectedEditableObject(selectedObject);

    if (editableObject) {
      this.selectedObject = editableObject;
      this.onSelectObject.emit(this.selectedObject);
    }
  }

  //#endregion

  //#region Path

  private onPathCreated(e: fabric.IEvent): void {
    const currentPath = (e as any).path as fabric.Path;

    let points: fabric.Point[] = [];

    if (this.lastDrawedForm) {
      points = points.concat(this.lastDrawedForm.path);
      this.canvas.remove(this.lastDrawedForm);
    }

    this.lastDrawedForm = currentPath;

    currentPath.set({ path: currentPath.path.concat(points) });
    let dims = (currentPath as any)._calcDimensions();

    currentPath.set({
      width: dims.width,
      height: dims.height,
      left: dims.left - this.brush.width / 2,
      top: dims.top - this.brush.width / 2,
      pathOffset: {
        x: dims.width / 2 + dims.left,
        y: dims.height / 2 + dims.top,
      },
      dirty: true,
    } as any);

    currentPath.setCoords();

    currentPath.clone((path: fabric.Path) => {
      if (this.lastDrawedStroke) {
        this.canvas.remove(this.lastDrawedStroke);
      }

      this.lastDrawedStroke = path;

      path.stroke = '#3F2A13';
      path.strokeWidth += 10;
      path.left -= 5;
      path.top -= 5;
      path.fill = 'rgba(0,0,0,0)';

      currentPath.shadow = null;

      this.canvas.add(path);
      const index = this.canvas.getObjects().indexOf(currentPath) - 1;
      this.canvas.moveTo(path, index);
    });
  }

  //#endregion

  //#region Mouse

  private onMouseDown(e: fabric.IEvent): void {
    const canvasElement: any = document.getElementById('canvas');
  }

  private onMouseMove(e: fabric.IEvent): void {
    if (this.drawing) {
      this.drawingMouseCursorForm.opacity = 1;
      let coords = this.canvas.getPointer(e.e, false);
      const form = this.drawingMouseCursorForm.set({
        top: coords.y,
        left: coords.x,
      });
      form.setCoords();
      this.drawingMouseCanvas.renderAll();
    }
  }

  private onMouseOut(e: fabric.IEvent): void {
    if (this.drawing) {
      this.drawingMouseCursorForm.opacity = 0;
      this.drawingMouseCanvas.renderAll();
    }
  }

  private onMouseWheel(e: fabric.IEvent): void {
    const wheelEvent = e.e as WheelEvent;

    const delta = wheelEvent.deltaY;
    let zoom = this.canvas.getZoom();

    if (delta > 0) {
      zoom = zoom / 1.1;
    } else {
      zoom = zoom * 1.1;
    }

    if (zoom > 10) zoom = 10;
    if (zoom < 0.5) zoom = 0.5;

    const point = new fabric.Point(wheelEvent.offsetX, wheelEvent.offsetY);
    this.canvas.zoomToPoint(point, zoom);

    if (this.drawingMouseCursorForm) {
      this.drawingMouseCanvas.zoomToPoint(point, zoom);
      this.drawingMouseCanvas.renderAll();
    }

    e.e.preventDefault();
    e.e.stopPropagation();
  }

  //#endregion

  //#endregion

  //#region Brush

  public setDrawingMode(drawing: boolean = true): void {
    this.canvas.isDrawingMode = this.drawing;

    if (this.drawingMouseCursorForm) {
      this.drawingMouseCanvas.remove(this.drawingMouseCursorForm);
    }

    if (drawing) {
      if (this.brush.textureImagePath) {
        this.canvas.freeDrawingBrush = this.getBrushTextureFromImage(
          this.brush.textureImagePath
        );

        this.setBrushShadow(this.brush.shadowColor, this.brush.shadowWidth);
      }

      this.canvas.freeDrawingBrush.width = this.brush.width;
      this.canvas.freeDrawingBrush.color = this.brush.color;

      var cursorOpacity = 0.15;
      this.drawingMouseCursorForm = new fabric.Circle({
        left: 0,
        top: 0,
        radius: this.canvas.freeDrawingBrush.width / 2,
        fill: 'rgba(255,255,255,' + cursorOpacity + ')',
        stroke: '#fff',
        originX: 'center',
        originY: 'center',
        opacity: 0,
      });

      this.drawingMouseCanvas.add(this.drawingMouseCursorForm);
    }
  }

  private getBrushTextureFromImage(url: string): fabric.PatternBrush {
    var img = new Image();
    img.src = url;

    var texturePatternBrush = new (fabric as any).PatternBrush(
      this.canvas
    ) as fabric.PatternBrush;
    (texturePatternBrush as any).source = img;

    return texturePatternBrush;
  }

  //#endregion

  //#region Resize

  private fitResponsiveCanvas(): void {
    // canvas dimensions
    let canvasSize = {
      width: 1200,
      height: 700,
    };
    // canvas container dimensions
    let containerSize = {
      width: document.getElementById('canvas-container').offsetWidth,
      height: document.getElementById('canvas-container').offsetHeight,
    };
    let scaleRatio = Math.min(
      containerSize.width / canvasSize.width,
      containerSize.height / canvasSize.height
    );
    this.canvas.setWidth(containerSize.width);
    this.canvas.setHeight(containerSize.height);
    //set canvas zoom aspect
    this.canvas.setZoom(scaleRatio);

    this.drawingMouseCanvas.setWidth(containerSize.width);
    this.drawingMouseCanvas.setHeight(containerSize.height);
    //set canvas zoom aspect
    this.drawingMouseCanvas.setZoom(scaleRatio);
  }

  //#endregion

  //#region  Objects

  public addText(text: string): void {
    if (text) {
      const textArea = new fabric.IText(text, {
        left: 10,
        top: 10,
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#000000',
        scaleX: 1.5,
        scaleY: 1.5,
        fontWeight: '',
        hasRotatingPoint: true,
      });

      this.extend(textArea, this.randomId());
      this.add(textArea);
      this.selectItemAfterAdded(textArea);
    }
  }

  public addImageOnCanvas(
    url: string,
    customType: EditableObjectTypes = EditableObjectTypes.IMAGE,
    top: number = 10,
    left: number = 10,
    width?: number,
    height?: number
  ): void {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        if (width) {
          left = left - width / 2;
        }

        if (height) {
          top = top - height / 2;
        }

        image.set({
          left,
          top,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true,
        });

        if (width) {
          image.scaleToWidth(width);
        }

        if (height) {
          image.scaleToHeight(height);
        }

        if (customType !== EditableObjectTypes.IMAGE) {
          this.extend(image, this.randomId());
          const map = new Map<string, any>();
          map.set('type', customType);
          image.data = map;
        }

        this.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  public addFigure(figure: string): void {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200,
          height: 100,
          left: 10,
          top: 10,
          angle: 0,
          fill: '#3f51b5',
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100,
          height: 100,
          left: 10,
          top: 10,
          angle: 0,
          fill: '#4caf50',
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100,
          height: 100,
          left: 10,
          top: 10,
          fill: '#2196f3',
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50,
          left: 10,
          top: 10,
          fill: '#ff5722',
        });
        break;
      case 'line':
        add = new fabric.Line([250, 125, 250, 175], {
          fill: 'blue',
          stroke: 'green',
          strokeWidth: 5,
        });
        break;
    }

    this.extend(add, this.randomId());
    this.add(add);
    this.selectItemAfterAdded(add);
  }

  //#endregion

  //#region Selection

  //#region Actions

  public cleanSelect(): void {
    this.canvas?.discardActiveObject().renderAll();
  }

  public selectItemAfterAdded(obj: fabric.Object): void {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj, { e: obj } as any);
  }

  public clone(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  public removeSelected(): void {
    const activeObject = this.canvas.getActiveObject();
    const command = new RemoveCommand(this.canvas, activeObject);
    this.commandsService.insert(command);
    this.updateUndoRedo();
  }

  public bringToFront(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  public sendToBack(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.sendToBack(activeObject);
      activeObject.sendToBack();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  //#endregion

  //#region Properties

  private getSelectedEditableObject(object?: fabric.Object): IEditableObject {
    let result: IEditableObject;

    let selectedObject: fabric.Object;
    if (!object) {
      selectedObject = this.canvas.getActiveObject();
    } else {
      selectedObject = object;
    }

    let type: string | EditableObjectTypes = selectedObject.type;

    if (type == 'image' && selectedObject.data) {
      type = (selectedObject.data as Map<string, any>).get('type');
    }

    if (type !== 'group' && selectedObject) {
      switch (type) {
        case 'rect':
        case 'circle':
        case 'triangle':
          const figure = new Figure();
          figure.fill = this.getFill();
          figure.opacity = this.getOpacity();
          result = figure;
          break;
        case 'i-text':
          const text = new Text();
          text.fill = this.getFill();
          text.opacity = this.getOpacity();
          text.lineHeight = this.getLineHeight();
          text.charSpacing = this.getCharSpacing();
          text.bold = this.getBold();
          text.italic = this.hasItalic();
          text.underline = this.hasUnderline();
          text.lineThrough = this.hasLineThrough();
          text.textAlign = this.getTextAlign();
          text.fontFamily = this.getFontFamily();
          text.fontSize = this.getFontSize();
          result = text;
          break;
        case 'image':
          const image = new EditableImage();
          image.url = this.getUrl();
          image.opacity = this.getOpacity();
          result = image;
          break;
        case 'path':
          const path = new EditablePath();
          path.opacity = this.getOpacity();
          result = path;
          break;
        case EditableObjectTypes.MARKER:
          const marker = new Marker();
          marker.opacity = this.getOpacity();
          result = marker;
          break;
      }
    }

    result.data = this.getCustomData();

    return result;
  }

  //#region Getters

  private getActiveProp(name): string {
    const object = this.canvas.getActiveObject();
    if (!object) {
      return '';
    }

    return object[name] || '';
  }

  private getActiveStyle(styleName: string, object: any): any {
    object = object || this.canvas.getActiveObject();
    if (!object) {
      return '';
    }

    if (object.getSelectionStyles && object.isEditing) {
      return object.getSelectionStyles()[styleName] || '';
    } else {
      return object[styleName] || '';
    }
  }

  private getId(): string {
    return this.canvas.getActiveObject().toObject().id;
  }

  public getOpacity(): number {
    return this.getActiveStyle('opacity', null) * 100;
  }

  public getUrl(): string {
    return (this.canvas.getActiveObject() as fabric.Image).getSrc();
  }

  public getFill(): string {
    return this.getActiveStyle('fill', null);
  }

  public getLineHeight(): number {
    return this.getActiveStyle('lineHeight', null);
  }

  public getCharSpacing(): number {
    return this.getActiveStyle('charSpacing', null);
  }

  public getFontSize(): number {
    return this.getActiveStyle('fontSize', null);
  }

  public getBold(): boolean {
    return this.getActiveStyle('fontWeight', null);
  }

  public hasItalic(): boolean {
    return this.getActiveStyle('fontStyle', null) === 'italic';
  }

  public hasUnderline(): boolean {
    return this.getTextDecoration().includes('underline');
  }

  public hasLineThrough(): boolean {
    return this.getTextDecoration().includes('line-through');
  }

  public getTextDecoration(): string {
    return this.getActiveStyle('textDecoration', null);
  }

  public hasTextDecoration(value: string): boolean {
    return this.getTextDecoration().includes(value);
  }

  public getTextAlign(): string {
    return this.getActiveProp('textAlign');
  }

  public getFontFamily(): string {
    return this.getActiveProp('fontFamily');
  }

  public getCustomData(): any {
    return this.getActiveProp('data');
  }

  //#endregion

  //#region Setters

  private setActiveProp(name: any, value: any): void {
    const object = this.canvas.getActiveObject();
    if (!object) {
      return;
    }
    object.set(name, value).setCoords();
    this.canvas.renderAll();
    this.onSelectedObjectUpdated.emit(this.getSelectedEditableObject());
  }

  private setActiveStyle(
    styleName: any,
    value: string | number,
    object: fabric.IText
  ): void {
    object = object || (this.canvas.getActiveObject() as fabric.IText);
    if (!object) {
      return;
    }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;

      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.setSelectionStyles({ underline: true });
        } else {
          object.setSelectionStyles({ underline: false });
        }

        if (value.includes('overline')) {
          object.setSelectionStyles({ overline: true });
        } else {
          object.setSelectionStyles({ overline: false });
        }

        if (value.includes('line-through')) {
          object.setSelectionStyles({ linethrough: true });
        } else {
          object.setSelectionStyles({ linethrough: false });
        }
      }

      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.set('underline', true);
        } else {
          object.set('underline', false);
        }

        if (value.includes('overline')) {
          object.set('overline', true);
        } else {
          object.set('overline', false);
        }

        if (value.includes('line-through')) {
          object.set('linethrough', true);
        } else {
          object.set('linethrough', false);
        }
      }

      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
    this.onSelectedObjectUpdated.emit(this.getSelectedEditableObject());
  }

  public setBrushWidth(width: number): void {
    this.canvas.freeDrawingBrush.width = width;
    this.drawingMouseCursorForm?.setRadius(width / 2);
    this.drawingMouseCanvas?.renderAll();
  }

  public setBrushColor(color: string): void {
    this.canvas.freeDrawingBrush.color = color;
    this.canvas.renderAll();
  }

  public setBrushShadow(color: string, width: number): void {
    (this.canvas
      .freeDrawingBrush as fabric.PatternBrush).shadow = new fabric.Shadow({
      color: color,
      blur: width,
      affectStroke: true,
      offsetX: 0,
      offsetY: 0,
    });
  }

  public setId(id: string): void {
    const complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = id;
      return complete;
    };
  }

  public setOpacity(opacity: number): void {
    this.setActiveStyle('opacity', opacity / 100, null);
  }

  public setFill(color: string): void {
    this.setActiveStyle('fill', color, null);
  }

  public setUrl(url: string): void {
    (this.canvas.getActiveObject() as fabric.Image).setSrc(url, () => {
      this.canvas.renderAll();
    });
  }

  public setLineHeight(height: number): void {
    this.setActiveStyle('lineHeight', height, null);
  }

  public setCharSpacing(spacing: number): void {
    this.setActiveStyle('charSpacing', spacing, null);
  }

  public setFontSize(size: number): void {
    this.setActiveStyle('fontSize', size, null);
  }

  public setBold(value: boolean): void {
    this.setActiveStyle('fontWeight', value ? 'bold' : '', null);
  }

  public setFontStyle(italic: boolean): void {
    if (italic) {
      this.setActiveStyle('fontStyle', 'italic', null);
    } else {
      this.setActiveStyle('fontStyle', 'normal', null);
    }
  }

  public setUnderline(value: boolean): void {
    this.setTextDecoration(value, 'underline');
  }

  public setLineThrough(value: boolean): void {
    this.setTextDecoration(value, 'line-through');
  }

  private setTextDecoration(value: boolean, property: string): void {
    let styles = this.getTextDecoration();
    const included = styles.includes(property);
    if (value && !included) {
      styles += ` ${property}`;
    } else if (!value && included) {
      styles = styles.replace(RegExp(property, 'g'), '');
    }

    this.setActiveStyle('textDecoration', styles, null);
  }

  public setTextAlign(value: string): void {
    this.setActiveProp('textAlign', value);
  }

  public setFontFamily(fontFamily: string): void {
    this.setActiveProp('fontFamily', fontFamily);
  }

  public setCustomData(value: any): void {
    this.setActiveProp('data', value);
  }

  //#endregion

  //#endregion

  //#endregion

  //#region Background

  public setBackgroundColor(color: string): void {
    this.canvas.backgroundColor = color;
    this.canvas.renderAll();
  }

  public setBackgroundImage(url: string): void {
    const img = new fabric.Pattern({
      source: url,
      repeat: 'repeat',
    });

    this.canvas.setBackgroundColor(img, () => {
      setTimeout(() => {
        this.canvas.renderAll();
      }, 100);
    });
  }

  //#endregion

  //#region Utilities

  public extend(obj: any, id: number): void {
    obj.toObject = ((toObject) => {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id,
        });
      };
    })(obj.toObject);
  }

  public randomId(): number {
    return Math.floor(Math.random() * 999999) + 1;
  }

  public clear(): void {
    this.canvas.clear();
  }

  public getSelectedObject(): IEditableObject {
    return this.selectedObject;
  }

  //#endregion

  //#region Exports

  public exportToBase64(): string {
    return this.canvas.toDataURL({ format: 'png' });
  }

  public exportToSVG(): string {
    return this.canvas.toSVG();
  }

  public exportToJSON(): string {
    return JSON.stringify(this.canvas.toJSON(), null, 2);
  }

  //#endregion

  //#region Save & Load

  public saveCanvasToJSON(): void {
    const json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);
  }

  public loadCanvasFromJSON(): void {
    const CANVAS = localStorage.getItem('Kanvas');
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });
  }

  //#endregion

  //#region Drag & Drop

  public dropImage(
    point: any,
    url: string,
    width: number,
    height: number
  ): void {
    var m = this.canvas.viewportTransform;
    const pointer = this.canvas.getPointer(point, false);

    this.addImageOnCanvas(url, pointer.y, pointer.x, width, height);
  }

  //#endregion

  //#region undo / redo

  public add(object: fabric.Object): void {
    this.commandsService.insert(new AddCommand(this.canvas, object));
    this.updateUndoRedo();
  }

  public undo(): void {
    this.commandsService.undo();
    this.updateUndoRedo();
  }

  public redo(): void {
    this.commandsService.redo();
    this.updateUndoRedo();
  }

  private updateUndoRedo(): void {
    this.canUndoChanged();
    this.canRedoChanged();
  }

  private canUndoChanged(): void {
    const canUndo = this.commandsService.canUndo();
    this.onCanUndoChange.emit(canUndo);
  }

  private canRedoChanged(): void {
    const canRedo = this.commandsService.canRedo();
    this.onCanRedoChange.emit(canRedo);
  }

  //#endregion
}
