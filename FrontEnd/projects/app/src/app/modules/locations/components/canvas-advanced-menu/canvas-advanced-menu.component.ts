import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';
import { CanvasService } from '../../services/canvas.service';
import { SelectLocationModalComponent } from '../select-location-modal/select-location-modal.component';
import { SModalService } from '@ngx-spectre/common';
import { Select } from '../../../scenarios/models/select';
import { Media } from '../../models/media';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-canvas-advanced-menu',
  templateUrl: './canvas-advanced-menu.component.html',
  styleUrls: ['./canvas-advanced-menu.component.scss'],
})
export class CanvasAdvancedMenuComponent implements OnInit {
  @Input() canvas: FabricjsEditorComponent;
  @Input() canvasContainer: ElementRef;

  public fonts: Select[] = [];

  public images: Media[] = [];

  constructor(
    private canvasService: CanvasService,
    private modalService: SModalService,
    private mediaService: MediaService
  ) {}

  ngOnInit() {
    this.fonts = this.canvasService.getFonts();
    this.images = this.mediaService.get();
  }

  public onSelectLocationClick(event: MouseEvent): void {
    this.modalService.open(SelectLocationModalComponent.id);
  }

  public onSelectLocationModalClose(event: any): void {
    console.log(event);
  }

  public onBrushShadowChange(): void {
    this.canvasService.changeBrushShadow(this.canvas);
  }

  public onBrushWidthChange(): void {
    this.canvasService.changeBrushWidth(this.canvas);
  }

  public onBrushColorChange(): void {
    this.canvasService.changeBrushColor(this.canvas);
  }

  public onUploadImage(event: any): void {
    console.log('TODO : Upload Image');
  }

  public onOpacityChange(): void {
    this.canvasService.setOpacity(this.canvas);
  }

  public onFillChange(): void {
    this.canvasService.setFill(this.canvas);
  }

  public onFontFamilyChange(): void {
    this.canvasService.setFontFamily(this.canvas);
  }

  public onAlignText(value: string): void {
    this.canvasService.setTextAlign(value, this.canvas);
  }

  public onBold(): void {
    this.canvasService.setBold(this.canvas);
  }

  public onFontStyle(): void {
    this.canvasService.setFontStyle(this.canvas);
  }

  public onTextDecoration(value: string): void {
    this.canvasService.setTextDecoration(value, this.canvas);
  }

  public onFontSizeChange(): void {
    this.canvasService.setFontSize(this.canvas);
  }

  public onLineHeightChange(): void {
    this.canvasService.setLineHeight(this.canvas);
  }

  public onCharSpacingChange(): void {
    this.canvasService.setCharSpacing(this.canvas);
  }

  public onUploadFile(event: any): void {
    // TODO
  }
}
