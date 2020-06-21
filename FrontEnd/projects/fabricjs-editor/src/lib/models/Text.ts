import { IEditableObject } from './IEditableObject';
import { EditableObjectTypes } from './EditableObjectTypes';

export class Text implements IEditableObject {
  fill: string;
  opacity: number;
  fontFamily: string;
  textAlign: string;
  bold: boolean;
  italic: boolean;
  lineThrough: boolean;
  underline: boolean;
  charSpacing: number;
  lineHeight: number;
  fontSize: number;
  readonly type: EditableObjectTypes = EditableObjectTypes.TEXT;
}
