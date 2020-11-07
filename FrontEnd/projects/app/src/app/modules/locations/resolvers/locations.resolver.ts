import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location, LocationsService } from '@core-api';

@Injectable()
export class LocationsResolver implements Resolve<Location[]> {
  constructor(private locationService: LocationsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Location[]> {
    return this.locationService.list();
  }
}
