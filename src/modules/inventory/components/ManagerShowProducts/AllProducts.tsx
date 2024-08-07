import { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getAllItems } from '../../Api-Requests/genericRequests';
import { getProducts } from '../../features/product/productSlice';
import { getAllComponents } from '../../features/component/componentSlice';
import { useNavigate } from 'react-router-dom';
import DeleteProduct from '../DeleteProduct';
import DeleteComponent from '../DeleteComponent';
import { Edit } from '@mui/icons-material/';

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const products = useAppSelector((state) => state.product?.data || []);
  const components = useAppSelector((state) => state.component?.data || []);

  const allRows = useMemo(() => [...products, ...components], [products, components]);

  useEffect(() => {
    fetchProducts();
    fetchComponents();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllItems<IProduct[]>('api/inventory/product');
      dispatch(getProducts(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComponents = async () => {
    try {
      const response = await getAllItems<IComponent[]>('api/inventory/component');
      dispatch(getAllComponents(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const componentMap: Record<string, string> = useMemo(
    () => components.reduce((acc: Record<string, string>, component: IComponent) => {
      acc[component.id] = component.name || 'Unknown';
      return acc;
    }, {}),
    [components]
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'totalPrice', headerName: 'Price', type: 'number', width: 90 },
    { field: 'stockQuantity', headerName: 'Qty', type: 'number', width: 90 },
    {
      field: 'productComponents',
      headerName: 'Components',
      description: 'Displays components associated with a product.',
      sortable: false,
      width: 220,
      renderCell: (params) => {
        const product = params.row as IProduct;
        if (!product?.productComponents?.length) {
          return 'No Components';
        } 
        return (
          <Tooltip title="Components" arrow>
            <span>
              {product.productComponents.map((componentId, index) => (
                <span key={componentId}>
                  {componentMap[componentId] || 'Unknown Component'}
                  {index < product.productComponents.length - 1 && ', '}
                </span>
              ))}
            </span>
          </Tooltip>
        );
      },   
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const item = params.row as IProduct | IComponent;
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="primary"
              onClick={() => {
                setSelectedItemId(item.id);
                if ('productComponents' in item) {
                  navigate(`/inventory/productForm/${item.id}`);
                } else {
                  navigate(`/inventory/componentForm/${item.id}`);
                }
              }}
              style={{ marginRight: '8px' }}
            >
              <Edit/>
            </IconButton>
            {'productComponents' in item ? (
              <DeleteProduct item={item as IProduct} />
            ) : (
              <DeleteComponent item={item as IComponent} />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/inventory/productForm')}
          style={{ marginRight: '8px' }}
        >
          Add Product
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/inventory/componentForm')}
        >
          Add Component
        </Button>
      </div>
      <DataGrid
        rows={allRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default AllProducts;
