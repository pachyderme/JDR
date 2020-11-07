import { IEditableObject } from './IEditableObject';
import { EditableObjectTypes } from './EditableObjectTypes';

export class Path implements IEditableObject {
  fill: string;
  opacity: number;
  readonly type: EditableObjectTypes = EditableObjectTypes.PATH;
}
