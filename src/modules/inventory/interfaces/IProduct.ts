import Item from '../../../components/generic/item';
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
}
