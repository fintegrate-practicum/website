import Item from "../../../components/generic/item";

export interface ICart extends Item{
    id: string;
    user_id: string;
    product_id: string;
    buissnes_code: string;
    metadata: Record<string, any>;
}

