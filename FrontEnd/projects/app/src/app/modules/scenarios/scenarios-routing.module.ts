import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { ScenariosResolver } from './resolvers/scenarios.resolver';
import { ScenarioResolver } from './resolvers/scenario.resolver';
import { CharactersResolver } from '@core-api';
import { UniversResolver } from './resolvers/univers.resolver';
import { TemplatesResolver } from './resolvers/templates.resolver';
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
      items: ScenariosResolver,
    },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    resolve: {
      item: ScenarioResolver,
      characters: CharactersResolver,
      univers: UniversResolver,
      templates: TemplatesResolver,
    },
    data: {
      breadcrumb: 'Editing',
    },
  },
  {
    path: 'create',
    component: CreateComponent,
    resolve: {
      characters: CharactersResolver,
      univers: UniversResolver,
      templates: TemplatesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScenariosRoutingModule {}
