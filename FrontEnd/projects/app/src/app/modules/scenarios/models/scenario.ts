import { Location } from '@core-api';
import { Select } from './select';

export class Scenario {
  id: number;
  name: string;
  summary?: string;
  goal?: string;
  imageUrl?: string;
  template?: Select;
  universeId?: number;
  charactersIds?: number[];
  locationsIds?: number[];
  ressourcesIds?: number[];
}
