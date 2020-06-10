import { Component, OnInit } from '@angular/core';
import { SToastContainer } from '@ngx-spectre/common';

@Component({
  selector: 'app-save-toast',
  templateUrl: './save-toast.component.html',
  styleUrls: ['./save-toast.component.scss'],
})
export class SaveToastComponent extends SToastContainer implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
