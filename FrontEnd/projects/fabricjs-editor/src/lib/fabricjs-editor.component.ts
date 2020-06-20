import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'jdr-fabricjs-editor',
  templateUrl: './fabricjs-editor.component.html',
  styleUrls: ['./fabricjs-editor.component.scss'],
})
export class FabricjsEditorComponent implements AfterViewInit {
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;
  @ViewChild('htmlCursorCanvas') htmlCursorCanvas: ElementRef;

  private canvas: fabric.Canvas;
  public props = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: '',
    brushWidth: 50,
    brushColor: '#000',
    brushShadowWidth: 0,
    brushShadowColor: '#000',
    brushTextureImage: null,
  };

  public textString: string;
  public url: string | ArrayBuffer = '';

  public json: any;
  public textEditor = false;
  public figureEditor = false;
  public selected: any;
  public drawing = false;
  private drawingMouseCanvas: fabric.StaticCanvas;
  private drawingMouseCursorForm: fabric.Circle;
  private lastDrawedForm: fabric.Path;
  private lastDrawedStroke: fabric.Path;

  constructor() {}

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
      'object:modified': (e) => {},
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

  //#region Selection

  private onSelectionUpdated(e: fabric.IEvent): void {
    this.onSelection(e);
  }

  private onSelectionCreated(e: fabric.IEvent): void {
    this.onSelection(e);
  }

  private onSelectionCleared(e: fabric.IEvent): void {
    this.selected = null;
    this.resetPanels();
  }

  private onSelection(e: fabric.IEvent): void {
    const selectedObject = e.target as fabric.Object;
    this.selected = selectedObject;
    selectedObject.hasRotatingPoint = true;
    selectedObject.transparentCorners = false;
    selectedObject.borderDashArray = [3, 3];
    selectedObject.borderColor = '#555';
    selectedObject.cornerColor = '#EEE';
    selectedObject.cornerStrokeColor = '#888';
    selectedObject.cornerStyle = 'circle';
    selectedObject.cornerSize = 15;

    this.resetPanels();

    if (selectedObject.type !== 'group' && selectedObject) {
      this.getId();
      this.getOpacity();

      switch (selectedObject.type) {
        case 'rect':
        case 'circle':
        case 'triangle':
          this.figureEditor = true;
          this.getFill();
          break;
        case 'i-text':
          this.textEditor = true;
          this.getLineHeight();
          this.getCharSpacing();
          this.getBold();
          this.getFill();
          this.getTextDecoration();
          this.getTextAlign();
          this.getFontFamily();
          break;
        case 'image':
          break;
      }
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
      left: dims.left - this.props.brushWidth / 2,
      top: dims.top - this.props.brushWidth / 2,
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
    this.drawing = drawing;
    this.canvas.isDrawingMode = this.drawing;

    if (this.drawingMouseCursorForm) {
      this.drawingMouseCanvas.remove(this.drawingMouseCursorForm);
    }

    if (drawing) {
      if (this.props.brushTextureImage) {
        this.canvas.freeDrawingBrush = this.getBrushTextureFromImage(
          this.props.brushTextureImage
        );

        this.changeBrushShadow();
      }

      this.canvas.freeDrawingBrush.width = this.props.brushWidth;
      this.canvas.freeDrawingBrush.color = this.props.brushColor;

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

  public changeBrushWidth(): void {
    this.canvas.freeDrawingBrush.width = this.props.brushWidth;
    this.drawingMouseCursorForm.setRadius(this.props.brushWidth / 2);
    this.drawingMouseCanvas.renderAll();
  }

  public changeBrushColor(): void {
    this.canvas.freeDrawingBrush.color = this.props.brushColor;
    this.canvas.renderAll();
  }

  public changeBrushShadow(): void {
    (this.canvas
      .freeDrawingBrush as fabric.PatternBrush).shadow = new fabric.Shadow({
      color: this.props.brushShadowColor,
      blur: this.props.brushShadowWidth,
      affectStroke: true,
      offsetX: 0,
      offsetY: 0,
    });
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

  public addText(): void {
    if (this.textString) {
      const text = new fabric.IText(this.textString, {
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

      this.extend(text, this.randomId());
      this.canvas.add(text);
      this.selectItemAfterAdded(text);
      this.textString = '';
    }
  }

  public addImageOnCanvas(
    url: string,
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
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  public addFigure(figure): void {
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
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  //#endregion

  //#region Selection

  //#region Actions

  public cleanSelect(): void {
    this.canvas.discardActiveObject().renderAll();
  }

  public selectItemAfterAdded(obj): void {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
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
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  public removeSelected(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    }

    if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
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

  //#region Style

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
  }

  //#endregion

  //#region Properties

  private getActiveProp(name): string {
    const object = this.canvas.getActiveObject();
    if (!object) {
      return '';
    }

    return object[name] || '';
  }

  private setActiveProp(name, value): void {
    const object = this.canvas.getActiveObject();
    if (!object) {
      return;
    }
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  private getId(): void {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  public setId(): void {
    const val = this.props.id;
    const complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  public getOpacity(): void {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  public setOpacity(): void {
    this.setActiveStyle(
      'opacity',
      parseInt(this.props.opacity, 10) / 100,
      null
    );
  }

  public getFill(): void {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  public setFill(): void {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  public getLineHeight(): void {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  public setLineHeight(): void {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  public getCharSpacing(): void {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  public setCharSpacing(): void {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  public getFontSize(): void {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  public setFontSize(): void {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
  }

  public getBold(): void {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  public setBold(): void {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle(
      'fontWeight',
      this.props.fontWeight ? 'bold' : '',
      null
    );
  }

  public setFontStyle(): void {
    this.props.fontStyle = !this.props.fontStyle;
    if (this.props.fontStyle) {
      this.setActiveStyle('fontStyle', 'italic', null);
    } else {
      this.setActiveStyle('fontStyle', 'normal', null);
    }
  }

  public getTextDecoration(): void {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  public setTextDecoration(value): void {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
      iclass += ` ${value}`;
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  public hasTextDecoration(value): boolean {
    return this.props.TextDecoration.includes(value);
  }

  public getTextAlign(): void {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  public setTextAlign(value): void {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  public getFontFamily(): void {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  public setFontFamily(): void {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  //#endregion

  //#endregion

  //#region Background

  public setBackgroundColor(): void {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  public setBackgroundImage(): void {
    if (this.props.canvasImage) {
      const img = new fabric.Pattern({
        source: this.props.canvasImage,
        repeat: 'repeat',
      });

      this.canvas.setBackgroundColor(img, () => {
        setTimeout(() => {
          this.canvas.renderAll();
        }, 100);
      });
    }
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

  public resetPanels(): void {
    this.textEditor = false;
    this.figureEditor = false;
  }

  public confirmClear(): void {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }

  //#endregion

  //#region Exports

  public exportToBase64(): void {
    const image = new Image();
    image.src = this.canvas.toDataURL({ format: 'png' });
    const w = window.open('');
    w.document.write(image.outerHTML);
  }

  public exportToSVG(): string {
    const w = window.open('');
    w.document.write(this.canvas.toSVG());
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(this.canvas.toSVG());
  }

  public exportToJSON(): void {
    this.json = JSON.stringify(this.canvas, null, 2);
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
}
