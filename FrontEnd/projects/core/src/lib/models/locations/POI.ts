import { prop } from '@rxweb/reactive-form-validators';
import { Character } from '../characters/character';

export class POI {
  id: number;

  @prop()
  name: string;

  @prop()
  src?: string;

  @prop()
  summary: string;
  steps: string[];
  characters: Character[];
}
