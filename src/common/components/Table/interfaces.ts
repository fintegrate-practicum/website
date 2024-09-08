import { IComponent } from '../../../modules/inventory/interfaces/IComponent';
import { IProduct } from '../../../modules/inventory/interfaces/IProduct';

// Define interfaces for types
export interface Header {
  key: string;
  label: string;
  type: 'text' | 'number' | 'image';
  renderCell?: (params: any) => React.ReactNode;
}

export interface Row {
  [key: string]: string | number;
}

export interface DataObject {
  headers: Header[];
  rows: Row[];
}

export interface TableComponentProps {
  dataObject: DataObject;
  tableSize: 'small' | 'large';
  onDelete?: (id: string) => void;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
  onEdit?: (row: IProduct | IComponent) => void;
}
