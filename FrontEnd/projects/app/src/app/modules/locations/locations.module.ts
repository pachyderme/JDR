import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { FabricjsEditorModule } from '@fabricjs-editor';
import { EditComponent } from './pages/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { StartWithPipe } from '@core-api';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectLocationModalComponent } from './components/select-location-modal/select-location-modal.component';
import { CanvasService } from './services/canvas.service';
import { MediaService } from './services/media.service';
import { CanvasHeaderComponent } from './components/canvas-header/canvas-header.component';
import { CanvasDrawMenuComponent } from './components/canvas-draw-menu/canvas-draw-menu.component';
import { CanvasAdvancedMenuComponent } from './components/canvas-advanced-menu/canvas-advanced-menu.component';
import { CanvasAdvancedTextMenuComponent } from './components/canvas-advanced-text-menu/canvas-advanced-text-menu.component';
import { CanvasAdvancedBrushMenuComponent } from './components/canvas-advanced-brush-menu/canvas-advanced-brush-menu.component';
import { CanvasAdvancedImageMenuComponent } from './components/canvas-advanced-image-menu/canvas-advanced-image-menu.component';
import { PoiOptionsModalComponent } from './components/poi-options-modal/poi-options-modal.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { LocationResolver } from './resolvers/location.resolver';
import { LocationsResolver } from './resolvers/locations.resolver';

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
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SCardModule,
  ],
  declarations: [
    EditComponent,
    ListComponent,
    CreateComponent,
    SaveToastComponent,
    SelectLocationModalComponent,
    PoiOptionsModalComponent,
    CanvasHeaderComponent,
    CanvasDrawMenuComponent,
    CanvasAdvancedMenuComponent,
    CanvasAdvancedTextMenuComponent,
    CanvasAdvancedBrushMenuComponent,
    CanvasAdvancedImageMenuComponent,
  ],
  providers: [
    SToastService,
    StartWithPipe,
    CanvasService,
    MediaService,
    LocationResolver,
    LocationsResolver,
  ],
})
export class LocationsModule {}
