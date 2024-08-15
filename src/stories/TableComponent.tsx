import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

const TableComponent = ({
  dataObject,
  tableSize,
  onDelete,
  showDeleteButton,
  showEditButton,
  handleAmountChange,
  onEdit,
}: {
  dataObject: any;
  tableSize: any;
  onDelete: any;
  showDeleteButton: any;
  showEditButton: any;
  handleAmountChange: any;
  onEdit: any;
}) => {
  const isLarge = tableSize === 'large';
  const tableHeight = isLarge ? '300px' : '200px';
  const tableWidth = isLarge ? '85%' : '60%';
  const imageSize = isLarge ? '50px' : '50px';

  const [rows, setRows] = useState(dataObject.rows);
  const [pageSize, setPageSize] = useState(5);
  const handleDelete = (id: any) => {
    action('Row deleted')(id);
    const newRows = rows.filter((row: any) => row.id !== id);
    setRows(newRows);
    onDelete(id);
  };

  const handlePriceChange = (id: any, field: any, value: any) => {
    const updatedRows = rows.map((row: any) =>
      row.id === id ? { ...row, [field]: value } : row,
    );
    setRows(updatedRows);
    handleAmountChange(id, field, value);
  };

  const columns = [
    ...dataObject.headers.map((header: any) => {
      if (header.isImage) {
        return {
          field: 'name',
          headerName: header.label,
          flex: 1,
          renderCell: (params: any) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={params.row.image}
                alt='thumbnail'
                style={{
                  width: imageSize,
                  height: imageSize,
                  marginRight: '8px',
                }}
              />
              <span>{params.row.name}</span>
            </div>
          ),
        };
      }

      return {
        field: header.key,
        headerName: header.label,
        flex: 1,
        editable: header.isAmount,
        renderCell: (params: any) => {
          if (header.isPrice) {
            return (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>₪</span>
                {params.value}
              </div>
            );
          }
          if (header.isAmount) {
            return (
              <TextField
                type='number'
                value={params.value}
                onChange={(e) =>
                  handlePriceChange(params.id, header.key, e.target.value)
                }
                variant='outlined'
                size='small'
                style={{ width: '100%' }}
                InputProps={{
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#800080',
                    },
                  },
                }}
              />
            );
          }
          return params.value;
        },
      };
    }),
    ...(isLarge && (showDeleteButton || showEditButton)
      ? [
          {
            field: 'actions',
            headerName: '',
            flex: 0.5,
            renderCell: (params: any) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                {showEditButton && (
                  <IconButton
                    onClick={() => onEdit(params.row)}
                    aria-label='edit'
                    sx={{ color: '#800080' }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {showDeleteButton && (
                  <IconButton
                    onClick={() => handleDelete(params.row.id)}
                    aria-label='delete'
                    sx={{ color: '#800080' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div
      style={{
        height: tableHeight,
        width: tableWidth,
        marginTop: '20px',
        marginRight: tableSize === 'large' ? 'auto' : '0',
        marginLeft: tableSize === 'large' ? 'auto' : 'auto', // Center or align left for large tables
        display: 'flex',
        justifyContent: tableSize === 'large' ? 'center' : 'center',
      }}
    >
      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
          אין מה להציג, נא הכנס נתונים.
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={{ pageSize, page: 0 }}
          onPaginationModelChange={(model) => setPageSize(model.pageSize)}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f0f0f0',
              color: '#800080',
              borderBottom: '2px solid #800080',
            },
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #800080',
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
  );
};

TableComponent.propTypes = {
  dataObject: PropTypes.shape({
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['text', 'number', 'image']).isRequired,
        isAmount: PropTypes.bool,
        isPrice: PropTypes.bool,
        isImage: PropTypes.bool,
      }),
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  tableSize: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  showDeleteButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  handleAmountChange: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TableComponent;
