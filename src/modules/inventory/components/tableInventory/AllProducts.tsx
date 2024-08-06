import React, { useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { useTranslation } from 'react-i18next';

const AllProducts: React.FunctionComponent<{ productsArr: IProduct[], componentsArr: IComponent[] }> = ({ productsArr, componentsArr }) => {
  const { t } = useTranslation();
  const componentMap: Record<string, string> = useMemo(() => 
    componentsArr.reduce((acc, item) => {
      const id = String(item.id);
      acc[id] = item.name || t('unknownComponent');
      return acc;
    }, {} as Record<string, string>), 
    [componentsArr]
  );
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const allRows: (IProduct | IComponent)[] = [...productsArr, ...componentsArr];

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('ID'), width: 70 },
    { field: 'name', headerName: t('Name'), width: 130 },
    { field: 'totalPrice', headerName: t('Price'), type: 'number', width: 90 },
    {
      field: 'stockQuantity',
      headerName: t('Qty'),
      type: 'number',
      width: 90,
    },
    {
      field: 'productComponents',
      headerName: t('Components'),
      description: t('This column has a value getter and is not sortable.'),
      sortable: false,
      width: 220,
      renderCell: (params) => {
        const product = params.row as IProduct;
        if (!product || !product.productComponents || product.productComponents.length === 0) {
          return t('noComponents');
        }
        return (
          <>
            <Tooltip title={"..."} arrow>
              <span key={product.id}>
                {product.productComponents.map((componentId, index) => {
                  const componentName = componentMap[componentId] || t('unknownComponent');
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
        onRowSelectionModelChange={handleRowSelectionChange}
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
