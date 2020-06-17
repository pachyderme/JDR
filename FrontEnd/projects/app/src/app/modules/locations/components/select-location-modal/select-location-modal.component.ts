import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SModalService } from '@ngx-spectre/common';

@Component({
  selector: 'app-select-location-modal',
  templateUrl: './select-location-modal.component.html',
  styleUrls: ['./select-location-modal.component.scss'],
})
export class SelectLocationModalComponent implements OnInit {
  public static id: string = 'selectLocationModal';

  public selectedLocation: any;

  public items: any[] = [];

  private text: string =
    'To make a contribution to the world by making tools for the mind that advance humankind.';

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: SModalService) {}

  ngOnInit() {
    this.items = [
      {
        src: 'https://picsum.photos/300/150',
        name: 'City 1',
        description: this.text,
      },
      {
        src: 'https://picsum.photos/300/150',
        name: 'City 2',
        description: this.text,
      },
      {
        src: 'https://picsum.photos/300/150',
        name: 'City 3',
        description: this.text,
      },
      {
        src: 'https://picsum.photos/300/150',
        name: 'City 4',
        description: this.text,
      },
      {
        src: 'https://picsum.photos/300/150',
        name: 'City 5',
        description: this.text,
      },
      {
        src: 'https://picsum.photos/300/150',
        name: 'City 6',
        description: this.text,
      },
      {
        src: 'https://picsum.photos/300/150',
        name: 'City 7',
        description: this.text,
      },
      {
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
