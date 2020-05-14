import { Component } from '@angular/core';
import { SThemingService } from '@ngx-spectre/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'App';

  public constructor(private themingService: SThemingService) {
    this.themingService.update();
  }
}
