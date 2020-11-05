import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { CharactersRoutingModule } from './characters-routing.module';
import {
  SCardModule,
  SDropdownModule,
  SMenuModule,
  SThemingService,
  CommonModule as SCommonModule,
} from '@ngx-spectre/common';
import { CharacterResolver } from './resolvers/character.resolver';
import { CharactersResolver } from './resolvers/characters.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SCardModule,
    SDropdownModule,
    SMenuModule,
    SCommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ],
  declarations: [ListComponent, DetailsComponent, CreateComponent],
  providers: [SThemingService, CharacterResolver, CharactersResolver],
})
export class CharactersModule {}
