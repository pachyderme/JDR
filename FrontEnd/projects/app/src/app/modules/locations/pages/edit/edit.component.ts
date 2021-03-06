import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CanvasService } from '../../services/canvas.service';
import { SToastConfig, SToastService } from '@ngx-spectre/common';
import { SaveToastComponent } from '../../components/save-toast/save-toast.component';
import { Key } from 'ts-keycode-enum';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FabricjsEditorComponent,
  IEditableObject,
  EditableObjectTypes,
  Brush,
} from '@fabricjs-editor';
import { Location, POI, RouteDataService } from '@core-api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: FabricjsEditorComponent;
  @ViewChild('canvasContainer') canvasContainer: ElementRef;

  public location: Location;
  public brushcShadowColor: string = '#000';
  public brushcShadowWidth: number = 30;
  public canvasItems: any[];
  public lastMouseCoords: MouseEvent;
  public selectedObject: IEditableObject;
  public brush: Brush;
  public backgroundImagePath: string;
  public backgroundColor: string;
  public drawing: boolean = false;
  public canUndo: boolean = false;
  public canRedo: boolean = false;

  public exportedJson: string;

  constructor(
    private canvasService: CanvasService,
    private sToastService: SToastService,
    private route: ActivatedRoute,
    private routeDataService: RouteDataService,
    private router: Router
  ) {}

  //#region Public

  //#region Initialization

  public ngOnInit(): void {
    this.location = this.routeDataService.getItem(this.route);
    this.initListerners();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCanvas();
      this.onBackgroundImageChange();
    });
  }

  //#endregion

  //#region Events

  public onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case Key.Delete:
        this.canvasService.removeSelected(this.canvas);
        break;
    }

    if (event.ctrlKey) {
      switch (event.keyCode) {
        case Key.Z:
          this.onUndo();
          break;
        case Key.Y:
          this.onRedo();
          break;
      }
    }
  }

  public onExport(): void {
    const base64 = this.canvasService.exportToBase64(this.canvas);
    const image = new Image();
    image.src = base64;
    this.openInWindow(image.outerHTML);
  }

  public onExportSVG(): void {
    const svg = this.canvasService.exportToSVG(this.canvas);
    this.openInWindow(svg);
  }

  private openInWindow(value: string): void {
    const w = window.open('');
    w.document.write(value);
  }

  public onExportJSON(): void {
    this.exportedJson = this.canvasService.exportToJSON(this.canvas);
  }

  public onSave(): void {
    this.canvasService.save(this.canvas);
    const toastConfig = new SToastConfig('bottom', 'right', 3000);
    this.sToastService.showFromComponent(SaveToastComponent, toastConfig);
  }

  public onLoad(): void {
    this.canvasService.load(this.canvas);
  }

  public onClear(): void {
    this.canvasService.clear(this.canvas);
  }

  public onRemove(): void {
    this.canvasService.removeSelected(this.canvas);
  }

  public onSendToBack(): void {
    this.canvasService.sendToBack(this.canvas);
  }

  public onBringToFront(): void {
    this.canvasService.bringToFront(this.canvas);
  }

  public onClone(): void {
    this.canvasService.clone(this.canvas);
  }

  public onCleanSelect(): void {
    this.canvasService.cleanSelect(this.canvas);
  }

  public onUndo(): void {
    this.canvasService.undo(this.canvas);
  }

  public onRedo(): void {
    this.canvasService.redo(this.canvas);
  }

  public onCanUndoChange(canUndo: boolean): void {
    this.canUndo = canUndo;
  }

  public onCanRedoChange(canRedo: boolean): void {
    this.canRedo = canRedo;
  }

  public onDrawingChange(value: boolean): void {
    this.drawing = value;
  }

  public onAddFigure(value: string): void {
    this.canvasService.addFigure(value, this.canvas);
  }

  public onAddText(): void {
    this.canvasService.addTextZone('My text', this.canvas);
  }

  public onAddMarker(): void {
    this.canvasService.addImage(
      '../../../../../assets/icons/marker.png',
      this.canvas,
      EditableObjectTypes.MARKER
    );
  }

  /**
   * TODO : Move to FabricJsEditor
   */
  public onDrop(event: CdkDragDrop<string[]>): void {
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

  public onBackgroundColorChange(): void {
    this.canvasService.setBackgroundColor(this.backgroundColor, this.canvas);
  }

  public onBackgroundImageChange(): void {
    this.canvasService.setBackgroundImage(
      this.backgroundImagePath,
      this.canvas
    );
  }

  public onSelectObject(selectedObject: IEditableObject): void {
    this.selectedObject = selectedObject ? { ...selectedObject } : null;
  }

  public onSelectedObjectUpdated(selectedObject: IEditableObject): void {
    this.selectedObject = selectedObject ? { ...selectedObject } : null;
  }

  public onBrushColorChange(value: string): void {
    this.brush = { ...this.brush, color: value };
  }

  public onBrushWidthChange(value: number): void {
    this.brush = { ...this.brush, width: value };
  }

  public onBrushShadowColorChange(value: string): void {
    this.brush = { ...this.brush, shadowColor: value };
  }

  public onBrushShadowWidthChange(value: number): void {
    this.brush = { ...this.brush, shadowWidth: value };
  }

  public onBrushTextureChange(value: string): void {
    this.brush = { ...this.brush, textureImagePath: value };
  }

  public onOpacityChange(value: number): void {
    this.canvasService.setOpacity(value, this.canvas);
  }

  public onFillChange(value: string): void {
    this.canvasService.setFill(value, this.canvas);
  }

  public onUrlChange(value: string): void {
    this.canvasService.setUrl(value, this.canvas);
  }

  public onFontFamilyChange(value: string): void {
    this.canvasService.setFontFamily(value, this.canvas);
  }

  public onTextAlignChange(value: string): void {
    this.canvasService.setTextAlign(value, this.canvas);
  }

  public onBoldChange(value: boolean): void {
    this.canvasService.setBold(value, this.canvas);
  }

  public onItalicChange(value: boolean): void {
    this.canvasService.setItalic(value, this.canvas);
  }

  public onUnderlineChange(value: boolean): void {
    this.canvasService.setUnderline(value, this.canvas);
  }

  public onLineThroughChange(value: boolean): void {
    this.canvasService.setLinThrough(value, this.canvas);
  }

  public onFontSizeChange(value: number): void {
    this.canvasService.setFontSize(value, this.canvas);
  }

  public onLineHeightChange(value: number): void {
    this.canvasService.setLineHeight(value, this.canvas);
  }

  public onCharSpacingChange(value: number): void {
    this.canvasService.setCharSpacing(value, this.canvas);
  }

  public onLocationSelected(value: Location): void {
    this.setCustomDataToCurrentObject('location', value);
    this.canvasService.setCustomData(this.selectedObject.data, this.canvas);
  }

  public onPoiOptionsChanged(value: POI): void {
    this.setCustomDataToCurrentObject('POI', value);
    this.canvasService.setCustomData(this.selectedObject.data, this.canvas);
  }

  public onLocationClick(location: Location): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['../', location.id], {
        relativeTo: this.route,
      })
    );

    window.open(url, '_blank');
  }

  //#endregion

  //#endregion

  //#region Private

  private setCustomDataToCurrentObject(key: string, value: any): void {
    let map: Map<string, any>;

    if (this.selectedObject.data) {
      map = new Map<string, any>(this.selectedObject.data);
    } else {
      map = new Map<string, any>();
    }

    map.set(key, value);

    this.selectedObject = { ...this.selectedObject, data: map };
  }

  private initListerners(): void {
    document.addEventListener('mousemove', (e: MouseEvent) => {
      this.lastMouseCoords = e;
    });

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  private initCanvas(): void {
    // brush
    this.brush = new Brush();
    this.brush.color = '#fff';
    this.brush.textureImagePath = '../../../../../assets/img/ground.jpg';
    this.brush.shadowColor = 'rgba(250, 250, 250, 0.5)';
    this.brush.shadowWidth = 35;
    this.brush.width = 140;

    // background
    this.backgroundImagePath = this.location.backgroundImage;
  }

  //#endregion
}
