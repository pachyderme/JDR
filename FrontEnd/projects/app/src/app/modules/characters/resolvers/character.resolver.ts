import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Character, CharactersService } from '@core-api';

@Injectable()
export class CharacterResolver implements Resolve<Character> {
  constructor(private characterService: CharactersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Character> {
    return this.characterService.get(+route.params.id);
  }
}
