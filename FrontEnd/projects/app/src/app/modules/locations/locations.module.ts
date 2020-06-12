import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { FabricjsEditorModule } from 'projects/fabricjs-editor/src/public-api';
import { EditComponent } from './pages/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { OverlayModule } from '@angular/cdk/overlay';

import {
  STabsModule,
  SNavModule,
  SDividerModule,
  SDropdownModule,
  SMenuModule,
  SToastService,
  SToastModule,
  STooltipDirectiveModule,
  SAccordionModule,
  SSliderModule,
  SAutocompleteModule,
  SFormModule,
  SBadgeDirectiveModule,
} from '@ngx-spectre/common';
import { SaveToastComponent } from './components/save-toast/save-toast.component';
import { StartWithPipe } from '../../shared/pipes/start-with.pipe';

@NgModule({
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FabricjsEditorModule,
    FormsModule,
    ColorPickerModule,
    STabsModule,
    SNavModule,
    SDividerModule,
    SDropdownModule,
    SMenuModule,
    SToastModule,
    OverlayModule,
    STooltipDirectiveModule,
    SAccordionModule,
    SSliderModule,
    SAutocompleteModule,
    SMenuModule,
    SFormModule,
    SBadgeDirectiveModule,
  ],
  declarations: [EditComponent, SaveToastComponent],
  providers: [SToastService, StartWithPipe],
})
export class LocationsModule {}
