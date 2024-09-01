import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../app/hooks';
import { getAllItems } from '../../Api-Requests/genericRequests';
import { getProducts } from '../../features/product/productSlice';
import { getAllComponents } from '../../features/component/componentSlice';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import DeleteProduct from '../DeleteProduct';
import DeleteComponent from '../DeleteComponent';
import TableComponent from '../../../../stories/TableComponent';
import Button from '../../../../common/components/Button/Button';

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useAppSelector(
    (state: { product: { data: any } }) => state.product?.data || [],
  );
  const components = useAppSelector(
    (state: { component: { data: any } }) => state.component?.data || [],
  );

  const allRows = useMemo(
    () => [...products, ...components],
    [products, components],
  );

  useEffect(() => {
    fetchProducts();
    fetchComponents();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllItems<IProduct[]>('inventory/product');
      dispatch(getProducts(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComponents = async () => {
    try {
      const response = await getAllItems<IComponent[]>('inventory/component');
      dispatch(getAllComponents(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    const item = allRows.find((item) => item.id === id);

    if (!item) {
      console.error(`Item with ID ${id} not found.`);
      return;
    }

    if ('productComponents' in item) {
      return <DeleteProduct item={item as IProduct} />;
    } else {
      return <DeleteComponent item={item as IComponent} />;
    }
  };

  const handleEdit = (item: IProduct | IComponent) => {
    navigateToUpdate(item);
  };

  const navigateToUpdate = (item: IProduct | IComponent) => {
    if ('productComponents' in item) {
      navigate(`/inventory/productForm/${item.id}`);
    } else {
      navigate(`/inventory/componentForm/${item.id}`);
    }
  };

  const dataObject = {
    headers: [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'totalPrice', label: 'Price', type: 'number', isPrice: true },
      { key: 'stockQuantity', label: 'Qty', type: 'number' },
      { key: 'productComponents', label: 'Components', type: 'text' },
    ],
    rows: allRows,
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/inventory/productForm')}
          style={{ marginRight: '8px' }}
        >
          Add Product
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate('/inventory/componentForm')}
        >
          Add Component
        </Button>
      </div>
      <TableComponent
        dataObject={dataObject}
        tableSize='large'
        showDeleteButton
        showEditButton
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleAmountChange={() => {}}
      />
    </div>
  );
};

export default AllProducts;
