import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location, LocationsService } from '@core-api';
import { SModalService } from '@ngx-spectre/common';

@Component({
  selector: 'app-select-location-modal',
  templateUrl: './select-location-modal.component.html',
  styleUrls: ['./select-location-modal.component.scss'],
})
export class SelectLocationModalComponent implements OnInit {
  public static id: string = 'selectLocationModal';

  @Input('item')
  public selectedLocation: Location;

  public items: Location[] = [];

  private text: string =
    'To make a contribution to the world by making tools for the mind that advance humankind.';

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: SModalService,
    private locationsService: LocationsService
  ) {}

  ngOnInit() {
    this.locationsService.list().subscribe((result) => (this.items = result));
  }

  public onCloseModal(event: MouseEvent): void {
    this.modalService.close(SelectLocationModalComponent.id);
    this.onClose.emit(this.selectedLocation);
  }

  public onSelectLocation(item: any): void {
    this.selectedLocation = item;
  }
}
