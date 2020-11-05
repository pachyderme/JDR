import { prop } from '@rxweb/reactive-form-validators';

export class Character {
  id: number;
  @prop()
  name: string;
  @prop()
  biography?: string;
  @prop()
  src: string;
  @prop()
  scenarios?: any[];
}
