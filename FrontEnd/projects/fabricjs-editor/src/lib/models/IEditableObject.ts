import { EditableObjectTypes } from './EditableObjectTypes';
export interface IEditableObject {
  fill?: string;
  opacity: number;
  type: EditableObjectTypes;
  data?: Map<string, any>;
}
