import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SModalService } from '@ngx-spectre/common';
import { Location } from '../../models/Location';

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

  constructor(private modalService: SModalService) {}

  ngOnInit() {
    this.items = [
      {
        id: 1,
        src: 'https://picsum.photos/300/150',
        name: 'City 1',
        description: this.text,
      },
      {
        id: 2,
        src: 'https://picsum.photos/300/150',
        name: 'City 2',
        description: this.text,
      },
      {
        id: 3,
        src: 'https://picsum.photos/300/150',
        name: 'City 3',
        description: this.text,
      },
      {
        id: 4,
        src: 'https://picsum.photos/300/150',
        name: 'City 4',
        description: this.text,
      },
      {
        id: 5,
        src: 'https://picsum.photos/300/150',
        name: 'City 5',
        description: this.text,
      },
      {
        id: 6,
        src: 'https://picsum.photos/300/150',
        name: 'City 6',
        description: this.text,
      },
      {
        id: 7,
        src: 'https://picsum.photos/300/150',
        name: 'City 7',
        description: this.text,
      },
      {
        id: 8,
        src: 'https://picsum.photos/300/150',
        name: 'City 8',
        description: this.text,
      },
    ];
  }

  public onCloseModal(event: MouseEvent): void {
    this.modalService.close(SelectLocationModalComponent.id);
    this.onClose.emit(this.selectedLocation);
  }

  public onSelectLocation(item: any): void {
    this.selectedLocation = item;
  }
}
