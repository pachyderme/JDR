import { POI } from './POI';
import { Player } from './Player';

export class Quest {
  id: number;
  name: string;
  summary: string;
  pointsOfInterest: POI[];
  rewards: Map<string, any>;
  players?: Player[];
}
