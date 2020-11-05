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
  SAccordionModule,
  STooltipDirectiveModule,
} from '@ngx-spectre/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StartWithPipe } from '../../shared/pipes/start-with.pipe';
import { FabricjsEditorModule } from 'projects/fabricjs-editor/src/public-api';
import { CanvasService } from '../locations/services/canvas.service';
import { CanvasCreationMenuComponent } from './components/canvas-creation-menu/canvas-creation-menu.component';
import { ScenarioResolver } from './resolvers/scenario.resolver';
import { ScenariosResolver } from './resolvers/scenarios.resolver';

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
    FabricjsEditorModule,
    SAccordionModule,
    STooltipDirectiveModule,
  ],
  declarations: [
    ListComponent,
    DetailsComponent,
    CreateComponent,
    CanvasCreationMenuComponent,
  ],
  providers: [StartWithPipe, CanvasService, ScenarioResolver, ScenariosResolver],
})
export class ScenariosModule {}
