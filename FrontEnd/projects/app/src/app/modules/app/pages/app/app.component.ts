import { Component } from '@angular/core';
import { SThemingService, SThemeConfiguration } from '@ngx-spectre/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'App';

  public constructor(private themingService: SThemingService) {
    const theme = new SThemeConfiguration();
    theme.primaryColor = '#0078D4';
    this.themingService.update(theme);
  }
}
