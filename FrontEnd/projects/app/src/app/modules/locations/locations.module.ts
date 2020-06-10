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
} from '@ngx-spectre/common';
import { SaveToastComponent } from './components/save-toast/save-toast.component';

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
  ],
  declarations: [EditComponent, SaveToastComponent],
  providers: [SToastService],
})
export class LocationsModule {}
