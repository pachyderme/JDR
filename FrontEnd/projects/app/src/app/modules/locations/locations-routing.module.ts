import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'edit/0',
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}
