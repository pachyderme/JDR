import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';
import { SToastConfig, SToastService } from '@ngx-spectre/common';
import { SaveToastComponent } from '../../components/save-toast/save-toast.component';
import { KeyValue } from '@angular/common';
import { StartWithPipe } from 'projects/app/src/app/shared/pipes/start-with.pipe';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: FabricjsEditorComponent;

  public location: any;
  public fonts: any[] = [];
  public brushcShadowColor: string = '#000';
  public brushcShadowWidth: number = 30;
  public images: any[] = [];
  public canvasItems: any[];
  public lastMouseCoords: MouseEvent;

  constructor(
    private sToastService: SToastService,
    private startWithPipe: StartWithPipe
  ) {}

  ngOnInit() {
    this.location = { name: "Mar'Salma" };
    this.fonts = [
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

    this.images = [
      {
        url: '../../../../../assets/img/flaw.png',
      },
      {
        url: '../../../../../assets/img/ground.jpg',
      },
      {
        url: '../../../../../assets/img/mountain_1.png',
      },
      {
        url: '../../../../../assets/img/water.jpg',
      },
    ];

    document.addEventListener('mousemove', (e: MouseEvent) => {
      this.lastMouseCoords = e;
    });

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // brush
      this.canvas.props.brushTextureImage =
        '../../../../../assets/img/ground.jpg';
      this.canvas.props.brushShadowColor = 'rgba(250, 250, 250, 0.5)';
      this.canvas.props.brushShadowWidth = 35;
      this.canvas.props.brushWidth = 140;

      // background
      this.canvas.props.canvasImage = '../../../../../assets/img/water.jpg';

      this.setCanvasImage();
      setTimeout(() => {
        this.onBrushShadowChange();
      });
    });
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (
      event.previousContainer !== event.container &&
      event.isPointerOverContainer
    ) {
      const item = event.previousContainer.data[event.previousIndex] as any;
      const imgElement = event.item.element.nativeElement as HTMLImageElement;
      const width = imgElement.clientWidth;
      const height = imgElement.clientHeight;
      this.canvas.dropImage(this.lastMouseCoords, item.url, width, height);
    }
  }

  public fontsFilter(items: KeyValue<string, string>[], search: string): any[] {
    if (this.startWithPipe) {
      return this.startWithPipe.transform(this.fonts, search, 'value');
    } else {
      return this.fonts;
    }
  }

  public onDrawMenuClick(item: string): void {
    switch (item) {
      case 'brush':
        if (this.canvas.selected) {
          this.cleanSelect();
          this.canvas.setDrawingMode(true);
        } else {
          this.canvas.setDrawingMode(!this.canvas.drawing);
        }
        break;
      case 'move':
        this.canvas.setDrawingMode(false);
        break;
      case 'line':
      case 'square':
      case 'triangle':
      case 'circle':
      case 'rectangle':
        this.onAddFigure(item);
        break;
      case 'text':
        this.onAddText();
        break;
    }

    if (item !== 'brush') {
      this.canvas.setDrawingMode(false);
    }
  }

  public onBrushShadowChange(): void {
    this.canvas.changeBrushShadow();
  }

  public onBrushWidthChange(): void {
    this.canvas.changeBrushWidth();
  }

  public onBrushColorChange(): void {
    this.canvas.changeBrushColor();
  }

  public onUploadImage(): void {
    console.log('TODO : Upload Image');
  }

  public onAddText(): void {
    this.canvas.textString = 'Hello';
    this.addText();
  }

  public onAddFigure(form: string): void {
    this.addFigure(form);
  }

  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }

  public saveCanvasToJSON() {
    this.canvas.saveCanvasToJSON();
    const toastConfig = new SToastConfig('bottom', 'right', 3000);
    this.sToastService.showFromComponent(SaveToastComponent, toastConfig);
  }

  public loadCanvasFromJSON() {
    this.canvas.loadCanvasFromJSON();
  }

  public confirmClear() {
    this.canvas.confirmClear();
  }

  public changeSize() {
    // this.canvas.changeSize();
  }

  public addText() {
    this.canvas.addText();
  }

  public getImgPolaroid(event) {
    this.canvas.getImgPolaroid(event);
  }

  public addImageOnCanvas(url) {
    this.canvas.addImageOnCanvas(url);
  }

  public readUrl(event) {
    this.canvas.readUrl(event);
  }

  public removeWhite(url) {
    this.canvas.removeWhite(url);
  }

  public addFigure(figure) {
    this.canvas.addFigure(figure);
  }

  public removeSelected() {
    this.canvas.removeSelected();
  }

  public sendToBack() {
    this.canvas.sendToBack();
  }

  public bringToFront() {
    this.canvas.bringToFront();
  }

  public clone() {
    this.canvas.clone();
  }

  public cleanSelect() {
    this.canvas.cleanSelect();
  }

  public setCanvasFill() {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage() {
    this.canvas.setCanvasImage();
  }

  public setId() {
    this.canvas.setId();
  }

  public setOpacity() {
    this.canvas.setOpacity();
  }

  public setFill() {
    this.canvas.setFill();
  }

  public setFontFamily() {
    this.canvas.setFontFamily();
  }

  public setTextAlign(value) {
    this.canvas.setTextAlign(value);
  }

  public setBold() {
    this.canvas.setBold();
  }

  public setFontStyle() {
    this.canvas.setFontStyle();
  }

  public hasTextDecoration(value): boolean {
    return this.canvas.hasTextDecoration(value);
  }

  public setTextDecoration(value) {
    this.canvas.setTextDecoration(value);
  }

  public setFontSize() {
    this.canvas.setFontSize();
  }

  public setLineHeight() {
    this.canvas.setLineHeight();
  }

  public setCharSpacing() {
    this.canvas.setCharSpacing();
  }

  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }

  public onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case Key.Delete:
        this.removeSelected();
        break;
    }
  }
}
