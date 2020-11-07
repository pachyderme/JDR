import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Select } from '../models/select';
import { TemplatesService } from '../services/templates.service';

@Injectable()
export class TemplatesResolver implements Resolve<Select[]> {
  constructor(private templatesService: TemplatesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Select[]> {
    return this.templatesService.list();
  }
}
