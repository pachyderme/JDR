import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SModalService } from '@ngx-spectre/common';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { POI } from '@core-api';

@Component({
  selector: 'app-poi-options-modal',
  templateUrl: './poi-options-modal.component.html',
  styleUrls: ['./poi-options-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoiOptionsModalComponent implements OnInit {
  public static id: string = 'poiOptionsModal';

  @Input() item: POI;

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  public baseForm: FormGroup;

  constructor(
    private modalService: SModalService,
    private formBuilder: RxFormBuilder
  ) {}

  ngOnInit() {}

  public onOpen(): void {
    let item = this.item;
    if (!item) {
      item = new POI();
      item.name = null;
    }
    this.baseForm = this.formBuilder.formGroup(POI, item);
  }

  public onCloseModal(event: MouseEvent): void {
    this.close();
  }

  public onBaseFormSubmit() {
    this.onClose.emit(this.baseForm.value);
    this.close();
  }

  private close(): void {
    this.baseForm?.reset();
    this.modalService.close(PoiOptionsModalComponent.id);
  }
}
