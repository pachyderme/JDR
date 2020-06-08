import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { CharactersRoutingModule } from './characters-routing.module';

@NgModule({
  imports: [CommonModule, CharactersRoutingModule],
  declarations: [ListComponent, DetailsComponent, CreateComponent],
})
export class CharactersModule {}
