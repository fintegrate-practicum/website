import Item from '../../../components/generic/item';
import { IProduct } from '../../inventory/interfaces/IProduct';

export interface ICart extends Item {
	id: string;
	user_id: string;
	product_id: string;
	product: IProduct;
	buissnes_code: string;
	metadata: Record<string, any>;
}
