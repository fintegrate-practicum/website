import { useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';

const AllProducts: React.FunctionComponent<{ productsArr: IProduct[], componentsArr: IComponent[] }> = ({ productsArr, componentsArr }) => {
  const componentMap: { [key: string]: string } = useMemo(() => componentsArr.reduce((acc, item) => ({ ...acc, [item.id]: item.componentName }), {}), [componentsArr]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const allRows: (IProduct | IComponent)[] = [...productsArr, ...componentsArr];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'totalPrice', headerName: 'Price', type: 'number', width: 90 },
    {
      field: 'stockQuantity',
      headerName: 'Qty',
      type: 'number',
      width: 90,
    },
    {
      field: 'productComponents',
      headerName: 'Components',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 220,
      renderCell: (params) => {
        const product = params.row as IProduct;
        if (!product || !product.productComponents || product.productComponents.length === 0) {
          return 'No Components';
        }
        return (
          <>
            <Tooltip title={"..."} arrow>
              <span key={product.id}>
                {product.productComponents.map((componentId, index) => {
                  const componentName = componentMap[componentId] || 'Unknown Component';
                  return (
                    <span key={index}>{componentName}, </span>
                  );
                })}
              </span>
            </Tooltip>
          </>
        );
      },
    },

  ];
  const handleRowSelectionChange = (selection: any) => {
    selection.rows && setSelectedRows(selection.rows.map((row: any) => row.id));
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
         rows={allRows}
        columns={columns}
        onRowSelectionModelChange={handleRowSelectionChange}//(בודק אם שורה נבחרה (בשביל הוספת מוצר
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
}
export default AllProducts;