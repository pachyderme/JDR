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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    CommonModule,
    SDropdownModule,
    UserModule,
  ],
  providers: [SThemingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
