export interface IComponent {
    id?: string;
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
    purchasePrice?: string;
    isOnSale?: boolean;
    salePercentage?: number;
    componentColor?: string;
    componentSize?: string;
    bussinesId?: string;
    images?: File[];
    salePrice?: string;
    isAlone?: boolean;

}


// id:"11",
// name: "table leg",
// componentBuyPrice: 80,
// addingComponentDate: new Date(),
// minQuantity: 3,
// stockQuantity: 5,
// isActive: true,
// adminId: "132",
// isSoldSeparately: false,
// description: "jhgjgfnvnbvn",
// totalPrice: 120,
// componentImages: ["https://www.shw.co.il/media/catalog/product/cache/82b780ee7d6ec5acf040ed4b1a996b50/b/o/boliver-small.png",""],
// isOnSale: true,
// salePercentage: 20,
// componentColor: "",
// componentSize:"120",
// bussinesId: "",