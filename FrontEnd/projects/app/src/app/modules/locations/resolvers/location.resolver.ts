import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { LocationsService } from '../services/locations.service';

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
