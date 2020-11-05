import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { CreateComponent } from './pages/create/create.component';
import { ScenariosResolver} from './resolvers/scenarios.resolver'
import { ScenarioResolver } from './resolvers/scenario.resolver';
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
    },
    data: {
      breadcrumb: 'Editing',
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
export class ScenariosRoutingModule {}
