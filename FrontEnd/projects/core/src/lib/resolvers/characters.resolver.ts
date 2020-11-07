import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Character } from '../models/public-api';
import { CharactersService } from '../services/public-api';

@Injectable()
export class CharactersResolver implements Resolve<Character[]> {
  constructor(private characterService: CharactersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Character[]> {
    return this.characterService.list();
  }
}
