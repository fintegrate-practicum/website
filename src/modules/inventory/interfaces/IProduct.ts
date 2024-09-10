import Item from '../../../components/generic/item';
import { ICustomField } from './ICustomField';
import { IVariant } from './IVariant';
export interface IProduct extends Item {
  id: string;
  name: string;
  description: string;
  images: string[];
  packageCost: number;
  productComponents: string[];
  totalPrice: number;
  adminId: string;
  isActive: boolean;
  isOnSale: boolean;
  salePercentage?: number;
  stockQuantity: number;
  businessId: string;
  componentStatus: string;
  customFields: ICustomField[];
  variants: IVariant[];
}
