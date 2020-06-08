import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { ScenariosRoutingModule } from './scenarios-routing.module';
import {
  SCardModule,
  SDropdownModule,
  SMenuModule,
  SStepModule,
  SFormModule,
  SAutocompleteModule,
  SAvatarModule,
  STabsModule,
  SBreadcrumbModule,
  STileModule,
  SNavModule,
  SDividerModule,
} from '@ngx-spectre/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StartWithPipe } from '../../shared/pipes/start-with.pipe';

@NgModule({
  imports: [
    CommonModule,
    ScenariosRoutingModule,
    SCardModule,
    SDropdownModule,
    SMenuModule,
    SStepModule,
    SFormModule,
    ReactiveFormsModule,
    SAutocompleteModule,
    SAvatarModule,
    STabsModule,
    SBreadcrumbModule,
    STileModule,
    SNavModule,
    SDividerModule,
  ],
  declarations: [ListComponent, DetailsComponent, CreateComponent],
  providers: [StartWithPipe],
})
export class ScenariosModule {}
