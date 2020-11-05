import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ScenariosService } from '../services/scenarios.service';
import { Scenario } from '../models/scenario';

@Injectable()
export class ScenarioResolver implements Resolve<Scenario> {
  constructor(private scenariosService: ScenariosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Scenario> {
    return this.scenariosService.get(+route.params.id);
  }
}
