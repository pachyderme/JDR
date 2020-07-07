import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { SCardModule, SDropdownModule, SMenuModule } from '@ngx-spectre/common';
import { CharactersService } from './services/characters.service';

@NgModule({
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SCardModule,
    SDropdownModule,
    SMenuModule,
  ],
  declarations: [ListComponent, DetailsComponent, CreateComponent],
  providers: [CharactersService],
})
export class CharactersModule {}
