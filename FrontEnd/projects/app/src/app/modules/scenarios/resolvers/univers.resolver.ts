import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SelectInitials } from '../models/select-initials';
import { UniversService } from '../services/univers.service';

@Injectable()
export class UniversResolver implements Resolve<SelectInitials[]> {
  constructor(private universService: UniversService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SelectInitials[]> {
    return this.universService.list();
  }
}
