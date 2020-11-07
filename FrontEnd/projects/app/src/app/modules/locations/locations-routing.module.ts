import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { LocationsResolver } from './resolvers/locations.resolver';
import { LocationResolver } from './resolvers/location.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      items: LocationsResolver,
    },
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      item: LocationResolver,
    },
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
export class LocationsRoutingModule {}
