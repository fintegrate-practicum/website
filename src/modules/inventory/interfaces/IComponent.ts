import { Item } from "../app/actions"
export interface IComponent extends Item {
    name?: string;
    componentBuyPrice?: number;
    addingComponentDate?: Date;
    minQuantity?: number;
    stockQuantity?: number;
    isActive?: boolean;
    adminId?: string;
    isSoldSeparately?: boolean;
    description?: string;
    totalPrice?: number;
    componentImages?: string[];
    isOnSale?: boolean;
    salePercentage?: number;
    componentColor?: string;
    componentSize?: string;
    bussinesId?: string;
    images?: File[];
    salePrice?: string;
    isAlone?: boolean;

}
