import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { HomeModule } from '../home/home.module';
import { CommonModule, SThemingService } from '@ngx-spectre/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, CommonModule],
  providers: [SThemingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
