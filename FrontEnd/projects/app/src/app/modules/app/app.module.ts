import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { HomeModule } from '../home/home.module';
import { CommonModule, SThemingService } from '@ngx-spectre/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    CommonModule,
  ],
  providers: [SThemingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
