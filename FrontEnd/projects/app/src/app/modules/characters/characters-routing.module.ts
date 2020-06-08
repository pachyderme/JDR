import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
