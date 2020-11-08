import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SelectLocationModalComponent } from '../select-location-modal/select-location-modal.component';
import { SModalService } from '@ngx-spectre/common';
import { Media } from '../../models/media';
import { MediaService } from '../../services/media.service';
import { IEditableObject, Brush, EditableObjectTypes } from '@fabricjs-editor';
import { PoiOptionsModalComponent } from '../poi-options-modal/poi-options-modal.component';
import { Location, POI } from '@core-api';

@Component({
  selector: 'app-canvas-advanced-menu',
  templateUrl: './canvas-advanced-menu.component.html',
  styleUrls: ['./canvas-advanced-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasAdvancedMenuComponent implements OnInit {
  //#region Inputs

  @Input() drawing: boolean;
  @Input() canvasContainer: ElementRef;
  @Input() brush: Brush;
  private _selectedObject: IEditableObject;

  @Input()
  public set selectedObject(value: IEditableObject) {
    this._selectedObject = value;

    if (value && value.data) {
      this.poi = this.getSelectedObjectPoi();
      this.location = this.getCurrentLocation();
    } else {
      this.poi = null;
      this.location = null;
    }
  }

  public get selectedObject(): IEditableObject {
    return this._selectedObject;
  }

  //#endregion

  //#region Outputs

  @Output() onOpacityChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onFillChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onUrlChange: EventEmitter<string> = new EventEmitter<string>();
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
  @Output() onBrushShadowColorChange: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() onBrushShadowWidthChange: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() onBrushWidthChange: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() onBrushColorChange: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() onLocationSelected: EventEmitter<Location> = new EventEmitter<
    Location
  >();

  @Output() onPoiOptionsChanged: EventEmitter<POI> = new EventEmitter<POI>();

  //#endregion

  public poi: POI;
  public location: Location;
  public images: Media[] = [];

  constructor(
    private modalService: SModalService,
    private mediaService: MediaService
  ) {}

  ngOnInit() {
    this.images = this.mediaService.get();
  }

  public onSelectLocationClick(event: MouseEvent): void {
    this.modalService.open(SelectLocationModalComponent.id);
  }

  public onSelectLocationModalClose(value: Location): void {
    this.onLocationSelected.emit(value);
  }

  public onEditPoiOptionsClick(event: MouseEvent): void {
    this.modalService.open(PoiOptionsModalComponent.id);
  }

  public onEditPoiOptionsModalClose(value: POI): void {
    this.onPoiOptionsChanged.emit(value);
  }

  public onUploadImage(event: any): void {
    console.log('TODO : Upload Image');
  }

  public onRequestOpacityChange(): void {
    this.onOpacityChange.emit(this.selectedObject.opacity);
  }

  public onRequestFillChange(): void {
    this.onFillChange.emit(this.selectedObject.fill);
  }

  public onRequestUrlChange(value: string): void {
    this.onUrlChange.emit(value);
  }

  public onRequestBrushShadowColorChange(value: string): void {
    this.onBrushShadowColorChange.emit(value);
  }

  public onRequestBrushShadowWidthChange(value: number): void {
    this.onBrushShadowWidthChange.emit(value);
  }

  public onRequestBrushWidthChange(value: number): void {
    this.onBrushWidthChange.emit(value);
  }

  public onRequestBrushColorChange(value: string): void {
    this.onBrushColorChange.emit(value);
  }

  public onRequestFontFamilyChange(value: string): void {
    this.onFontFamilyChange.emit(value);
  }

  public onRequestTextAlign(value: string): void {
    this.onTextAlignChange.emit(value);
  }

  public onRequestBold(value: boolean): void {
    this.onBoldChange.emit(value);
  }

  public onRequestItalic(value: boolean): void {
    this.onItalicChange.emit(value);
  }

  public onRequestUnderline(value: boolean): void {
    this.onUnderlineChange.emit(value);
  }

  public onRequestLineThrough(value: boolean): void {
    this.onLineThroughChange.emit(value);
  }

  public onRequestFontSizeChange(value: number): void {
    this.onFontSizeChange.emit(value);
  }

  public onRequestLineHeightChange(value: number): void {
    this.onLineHeightChange.emit(value);
  }

  public onRequestCharSpacingChange(value: number): void {
    this.onCharSpacingChange.emit(value);
  }

  public onUploadFile(event: any): void {
    // TODO
  }

  public hasSelectedObject(): boolean {
    return this.selectedObject != null;
  }

  public hasSelectedTextObject(): boolean {
    return (
      this.selectedObject != null &&
      this.selectedObject.type === EditableObjectTypes.TEXT
    );
  }

  public hasSelectedFigureObject(): boolean {
    return (
      this.selectedObject != null &&
      this.selectedObject.type === EditableObjectTypes.FIGURE
    );
  }

  public hasSelectedImageObject(): boolean {
    return (
      this.selectedObject != null &&
      this.selectedObject.type === EditableObjectTypes.IMAGE
    );
  }

  public hasSelectedMarkerObject(): boolean {
    return (
      this.selectedObject != null &&
      this.selectedObject.type === EditableObjectTypes.MARKER
    );
  }

  public canLinkToLocation(): boolean {
    return this.selectedObject.type !== EditableObjectTypes.MARKER;
  }

  private getCurrentLocation(): Location {
    return this.selectedObject?.data?.get('location');
  }

  private getSelectedObjectPoi(): POI {
    return this.selectedObject?.data?.get('POI');
  }
}
