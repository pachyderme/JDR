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
  SModalModule,
  SCardModule,
  SScrollbarModule,
} from '@ngx-spectre/common';
import { SaveToastComponent } from './components/save-toast/save-toast.component';
import { StartWithPipe } from '../../shared/pipes/start-with.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectLocationModalComponent } from './components/select-location-modal/select-location-modal.component';
import { CanvasService } from './services/canvas.service';
import { MediaService } from './services/media.service';
import { CanvasHeaderComponent } from './components/canvas-header/canvas-header.component';
import { CanvasDrawMenuComponent } from './components/canvas-draw-menu/canvas-draw-menu.component';
import { CanvasAdvancedMenuComponent } from './components/canvas-advanced-menu/canvas-advanced-menu.component';

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
    DragDropModule,
    SModalModule,
    SCardModule,
    SScrollbarModule,
  ],
  declarations: [
    EditComponent,
    SaveToastComponent,
    SelectLocationModalComponent,
    CanvasHeaderComponent,
    CanvasDrawMenuComponent,
    CanvasAdvancedMenuComponent,
  ],
  providers: [SToastService, StartWithPipe, CanvasService, MediaService],
})
export class LocationsModule {}
