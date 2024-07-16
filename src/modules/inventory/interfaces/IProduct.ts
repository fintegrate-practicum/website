export default interface IProduct {
    id: string;
    name: string;
    description: string;
    componentsImages: string[];
    packageCost: number;
    productComponents: string[];
    totalPrice: number;
    adminId: string;
    isActive: boolean;
    isOnSale: boolean;
    salePercentage: number;
    stockQuantity: number;
    bussinesId: string;
    componentStatus: string;
}