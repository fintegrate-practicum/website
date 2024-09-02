import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useTheme from '@mui/material/styles/useTheme';
import { Header, Row, DataObject, TableComponentProps } from './interfaces';

const TableComponent: React.FC<TableComponentProps> = ({
  dataObject,
  tableSize,
  onDelete,
  showDeleteButton = false,
  showEditButton = false,
  handleAmountChange,
  onEdit,
}) => {
  const theme = useTheme();
  const MyColor = theme.palette.primary.main;
  const isLarge = tableSize === 'large';
  const tableHeight = isLarge ? '300px' : '200px';
  const tableWidth = isLarge ? '85%' : '60%';
  const imageSize = isLarge ? '50px' : '50px';

  const [rows, setRows] = useState<Row[]>(dataObject.rows);
  const [pageSize, setPageSize] = useState<number>(5);

  const columns = [
    ...dataObject.headers.map((header) => {
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
                  handleAmountChange?.(
                    params.id.toString(),
                    header.key,
                    Number(e.target.value),
                  )
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
                      borderColor: MyColor,
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
        display: 'flex',
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
  handleAmountChange: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TableComponent;
