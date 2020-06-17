import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Location } from '../../models/location';
import { CanvasService } from '../../services/canvas.service';
import { LocationsService } from '../../services/locations.service';

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

  constructor(
    private canvasService: CanvasService,
    private locationsService: LocationsService
  ) {}

  //#region Public

  //#region Initialization

  public ngOnInit(): void {
    this.location = this.locationsService.get(1);
    this.initListerners();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCanvas();
      this.onBackgroundImageChange();
      setTimeout(() => {
        this.canvasService.changeBrushShadow(this.canvas);
      });
    });
  }

  //#endregion

  //#region Events

  public onExport(): void {
    this.canvasService.exportToBase64(this.canvas);
  }

  public onExportSVG(): void {
    this.canvasService.exportToSVG(this.canvas);
  }

  public onExportJSON(): void {
    this.canvasService.exportToJSON(this.canvas);
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

  public onBackgroundFillChange(): void {
    this.canvasService.setBackgroundFill(this.canvas);
  }

  public onBackgroundImageChange(): void {
    this.canvasService.setBackgroundImage(this.canvas);
  }

  //#endregion

  //#endregion

  //#region Private

  private initListerners(): void {
    document.addEventListener('mousemove', (e: MouseEvent) => {
      this.lastMouseCoords = e;
    });
  }

  private initCanvas(): void {
    // brush
    this.canvas.props.brushTextureImage =
      '../../../../../assets/img/ground.jpg';
    this.canvas.props.brushShadowColor = 'rgba(250, 250, 250, 0.5)';
    this.canvas.props.brushShadowWidth = 35;
    this.canvas.props.brushWidth = 140;

    // background
    this.canvas.props.canvasImage = this.location.backgroundImage;
  }

  //#endregion
}
