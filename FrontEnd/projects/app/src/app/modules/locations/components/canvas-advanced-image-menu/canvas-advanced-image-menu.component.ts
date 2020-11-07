import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Image } from '@fabricjs-editor';

@Component({
  selector: 'app-canvas-advanced-image-menu',
  templateUrl: './canvas-advanced-image-menu.component.html',
  styleUrls: ['./canvas-advanced-image-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasAdvancedImageMenuComponent implements OnInit {
  @Input() selectedObject: Image;

  @Output() onUrlChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public onRequestUrlChange(): void {
    this.onUrlChange.emit(this.selectedObject.url);
  }
}
