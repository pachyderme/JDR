import { Component } from '@angular/core';
import { SThemingService, SThemeConfiguration } from '@ngx-spectre/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'App';
  private theme: SThemeConfiguration;
  public currentMainRoute: string = '';

  public constructor(
    private themingService: SThemingService,
    private route: Router
  ) {
    this.handleRouteEvents(this.route);
  }

  private handleRouteEvents(router: Router): void {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const routes = e.url.split('/').filter((x) => x);
        const mainRoute = routes.length > 0 ? routes[0] : '';
        this.currentMainRoute = mainRoute;
        this.updateThemeConfiguration(mainRoute, routes);
      }
    });
  }

  private updateThemeConfiguration(mainRoute: string, routes: string[]): void {
    this.theme = new SThemeConfiguration();

    switch (mainRoute) {
      case 'characters':
        this.theme.primaryColor = '#B7477A';
        this.theme.successColor = '#3AD29F';
        if (routes[1] === 'create') {
          this.theme.linkColor = this.theme.lightColor;
        } else {
          this.theme.linkColor = this.theme.primaryColor;
        }
        break;
      case 'scenarios':
        this.theme.primaryColor = '#A370EF';
        if (routes[1] === 'create') {
          this.theme.linkColor = this.theme.lightColor;
        } else {
          this.theme.linkColor = this.theme.primaryColor;
        }
        break;
      case 'locations':
        this.theme.primaryColor = '#396A95';
        if (routes[1] === 'create') {
          this.theme.linkColor = this.theme.lightColor;
        } else {
          this.theme.linkColor = this.theme.primaryColor;
        }
        break;
      default:
        this.theme.primaryColor = '#0078D4';
        this.theme.successColor = '#3AD29F';
        this.theme.linkColor = '#0078D4';
        break;
    }

    this.themingService.update(this.theme);
  }
}
