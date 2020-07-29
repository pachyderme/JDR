import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { STileModule, SScrollbarModule } from '@ngx-spectre/common';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, STileModule, SScrollbarModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
