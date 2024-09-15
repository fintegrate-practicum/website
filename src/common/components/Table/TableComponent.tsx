import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableComponentProps } from './interfaces';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import * as XLSX from 'xlsx';

const TableComponent: React.FC<TableComponentProps> = ({
  dataObject,
  tableSize,
  onDelete,
  showDeleteButton = false,
  showEditButton = false,
  onEdit,
}) => {
  const theme = useTheme();
  const MyColor = theme.palette.primary.main;
  const isLarge = tableSize === 'large';
  const tableHeight = isLarge ? '300px' : '200px';
  const tableWidth = isLarge ? '85%' : '60%';
  const [pageSize, setPageSize] = useState<number>(5);
  const { t } = useTranslation();

  const columns = dataObject.headers.map((header) => ({
    field: header.key,
    headerName: header.label,
    flex: 1,
    renderCell: header.renderCell,
  }));

  if (isLarge && (showDeleteButton || showEditButton)) {
    columns.push({
      field: 'actions',
      headerName: '',
      flex: 0.5,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {showEditButton && (
            <IconButton
              onClick={() => onEdit?.(params.row)}
              aria-label='edit'
              sx={{ color: MyColor }}
            >
              <EditIcon />
            </IconButton>
          )}
          {showDeleteButton && (
            <IconButton
              onClick={() => onDelete?.(params.row.id)}
              aria-label='delete'
              sx={{ color: MyColor }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ),
    });
  }
  const exportToExcel = () => {
    const data = dataObject.rows.map((item) => {
      const rowData: { [key: string]: any } = {};

      dataObject.headers.forEach((header) => {
        rowData[header.label] = item[header.key];
      });

      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    const desiredColumnWidths = columns.map(() => ({ width: 20 }));
    worksheet['!cols'] = desiredColumnWidths;
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'MYSavedData.xlsx');
  };
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <div
        style={{
          height: tableHeight,
          width: tableWidth,
          marginTop: '20px',
          marginRight: tableSize === 'large' ? 'auto' : '0',
          display: 'flex',
        }}
      >
        {dataObject.rows.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
            {t('website.Nothing to display, please enter data.')}{' '}
          </div>
        ) : (
          <DataGrid
            rows={dataObject.rows}
            columns={columns}
            paginationModel={{ pageSize, page: 0 }}
            onPaginationModelChange={(model) => setPageSize(model.pageSize)}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0',
                color: MyColor,
                borderBottom: `2px solid ${MyColor}`,
              },
              '& .MuiDataGrid-row': {
                borderBottom: `1px solid ${MyColor}`,
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
            }}
          />
        )}
      </div>
      <Button onClick={exportToExcel} variant='outlined'>
        {t('website.Export to Excel')}
      </Button>
    </div>
  );
};
TableComponent.propTypes = {
  dataObject: PropTypes.shape({
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
  }).isRequired,
  tableSize: PropTypes.oneOf<'small' | 'large'>(['small', 'large']).isRequired,
  onDelete: PropTypes.func,
  showDeleteButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  onEdit: PropTypes.func,
};

export default TableComponent;