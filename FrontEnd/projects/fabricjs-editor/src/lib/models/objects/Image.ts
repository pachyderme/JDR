import { IEditableObject } from './IEditableObject';
import { EditableObjectTypes } from './EditableObjectTypes';

export class Image implements IEditableObject {
  fill: string;
  url: string;
  opacity: number;
  readonly type: EditableObjectTypes = EditableObjectTypes.IMAGE;
}
