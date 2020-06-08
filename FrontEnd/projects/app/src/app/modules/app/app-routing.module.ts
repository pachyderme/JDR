import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'scenarios',
    data: {
      breadcrumb: 'Scenarios',
    },
    loadChildren: () =>
      import('../scenarios/scenarios.module').then((m) => m.ScenariosModule),
  },
  {
    path: 'locations',
    data: {
      breadcrumb: 'Locations',
    },
    loadChildren: () =>
      import('../locations/locations.module').then((m) => m.LocationsModule),
  },
  {
    path: 'characters',
    data: {
      breadcrumb: 'Characters',
    },
    loadChildren: () =>
      import('../characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
