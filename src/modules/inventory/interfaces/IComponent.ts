export interface IComponent {
    id: string;
    componentName: string;
    componentBuyPrice: number;
    addingComponentDate: Date;
    minQuantity: number;
    componentStock: number;
    isActive: boolean;
    adminId: string;
    isSoldSeparately: boolean;
    componentDescription?: string;
    salePrice?: number;
    componentImages?: string[];
    isInSale?: boolean;
    salePercentage?: number;
    componentColor?: string;
    componentSize?: string;
    businessId: string;
}