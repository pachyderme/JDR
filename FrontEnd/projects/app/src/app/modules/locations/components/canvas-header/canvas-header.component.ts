import { Component, OnInit, Input } from '@angular/core';
import { FabricjsEditorComponent } from 'projects/fabricjs-editor/src/public-api';
import { CanvasService } from '../../services/canvas.service';
import { SToastService, SToastConfig } from '@ngx-spectre/common';
import { SaveToastComponent } from '../save-toast/save-toast.component';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'app-canvas-header',
  templateUrl: './canvas-header.component.html',
  styleUrls: ['./canvas-header.component.scss'],
})
export class CanvasHeaderComponent implements OnInit {
  @Input() canvas: FabricjsEditorComponent;

  constructor(
    private canvasService: CanvasService,
    private sToastService: SToastService
  ) {}

  ngOnInit() {
    this.initListerners();
  }

  public onSave(): void {
    this.canvasService.save(this.canvas);
    const toastConfig = new SToastConfig('bottom', 'right', 3000);
    this.sToastService.showFromComponent(SaveToastComponent, toastConfig);
  }

  public onLoad(): void {
    this.canvasService.loadCanvasFromJSON(this.canvas);
  }

  public onClear(): void {
    this.canvasService.confirmClear(this.canvas);
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

  public onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case Key.Delete:
        this.canvasService.removeSelected(this.canvas);
        break;
    }
  }

  private initListerners(): void {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }
}
