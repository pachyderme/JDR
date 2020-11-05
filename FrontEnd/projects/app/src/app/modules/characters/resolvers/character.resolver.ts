import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CharactersService } from '../services/characters.service';
import { Character } from '../models/character';
import { Injectable } from '@angular/core';

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
