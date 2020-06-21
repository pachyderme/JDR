import { IEditableObject } from './IEditableObject';
import { EditableObjectTypes } from './EditableObjectTypes';

export class Figure implements IEditableObject {
  fill: string;
  opacity: number;
  readonly type: EditableObjectTypes = EditableObjectTypes.FIGURE;
}
