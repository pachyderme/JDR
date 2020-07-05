import { Character } from './Character';
import { prop, model } from '@rxweb/reactive-form-validators';

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
