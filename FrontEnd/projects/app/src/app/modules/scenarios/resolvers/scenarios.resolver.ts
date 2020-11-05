import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Scenario } from '../models/scenario';
import { ScenariosService } from '../services/scenarios.service';

@Injectable()
export class ScenariosResolver implements Resolve<Scenario[]> {
  constructor(private scenariosService: ScenariosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Scenario[]> {
    return this.scenariosService.list();
  }
}
