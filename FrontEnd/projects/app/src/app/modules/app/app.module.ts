import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { HomeModule } from '../home/home.module';
import {
  CommonModule,
  SThemingService,
  SDropdownModule,
} from '@ngx-spectre/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from '../user/user.module';
import {
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
  NgxUiLoaderConfig,
} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsSize: 50,
  fgsColor: '#0EB7EF',
  fgsType: 'double-bounce',
  logoUrl: '../../../assets/img/logo_centered.png',
  logoSize: 150,
  logoPosition: 'center-center',
  overlayColor: 'rgba(255, 255, 255, 0.75)',
  pbColor: '#0EB7EF',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    CommonModule,
    SDropdownModule,
    UserModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
  ],
  providers: [SThemingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
