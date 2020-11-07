import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { Location } from '../models/location';

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
