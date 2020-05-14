import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { ScenariosRoutingModule } from './scenarios-routing.module';
import { SCardModule, SDropdownModule, SMenuModule } from '@ngx-spectre/common';

@NgModule({
  imports: [
    CommonModule,
    ScenariosRoutingModule,
    SCardModule,
    SDropdownModule,
    SMenuModule,
  ],
  declarations: [ListComponent, DetailsComponent],
})
export class ScenariosModule {}
