import { POI } from './POI';

export class Location {
  id: number;
  name: string;
  src: string;
  description?: string;
  locations?: Location[];
  pointsOfInterest?: POI[];
  backgroundImage?: string;
  backgroundColor?: string;
}
