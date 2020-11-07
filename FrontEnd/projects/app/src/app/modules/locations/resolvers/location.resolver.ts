import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location, LocationsService } from '@core-api';

@Injectable()
export class LocationResolver implements Resolve<Location> {
  constructor(private locationsService: LocationsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Location> {
    return this.locationsService.get(+route.params.id);
  }
}
