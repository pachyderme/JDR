import { IEditableObject } from './IEditableObject';
import { EditableObjectTypes } from './EditableObjectTypes';

export class Marker implements IEditableObject {
  opacity: number;
  readonly type: EditableObjectTypes = EditableObjectTypes.MARKER;
}
