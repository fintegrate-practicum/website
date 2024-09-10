import { ComponentType } from '../../../components/Setting/MySetting';

export interface ICustomField {
  fieldName: string;
  fieldType: ComponentType;
  options?: { value: string; label: string }[];
  isRequired: boolean;
}
