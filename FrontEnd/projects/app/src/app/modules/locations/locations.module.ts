import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { FabricjsEditorModule } from 'projects/fabricjs-editor/src/public-api';

@NgModule({
  imports: [CommonModule, LocationsRoutingModule, FabricjsEditorModule],
  declarations: [],
  providers: [],
})
export class LocationsModule {}
