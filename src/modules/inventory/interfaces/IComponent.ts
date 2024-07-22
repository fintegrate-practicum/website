export interface IComponent {
    id: string;
    name: string;
    componentBuyPrice: number;
    addingComponentDate: Date;
    minQuantity: number;
    stockQuantity: number;
    isActive: boolean;
    adminId: string;
    isSoldSeparately: boolean;
    description?: string;
    totalPrice?: number;
    images?: string[];
    isOnSale?: boolean;
    salePercentage?: number;
    componentColor?: string;
    componentSize?: string;
    businessId: string;
}

