import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Item from './item';
import { ComponentType, useMemo, useState } from 'react';
import { Dialog } from '@mui/material';

export interface Column {
  name: string;
  header: string;
  type?: 'date' | 'text';
}

const GenericList = (props: {
  title: string;
  list: object[];
  column: Column[];
  desing: ComponentType<{
    item: object;
    column: Column[];
  }> | null;
  DialogComponent?: ComponentType<{ item: object }>;
}) => {
  const { title, list, column, desing, DialogComponent } = props;
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<object | null>(null);

  const handleClickOpen = (item: object) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const existList = useMemo(() => {
    if (!Array.isArray(list) || list.length === 0) {
      console.error("Expected 'list' to be an array but got:", list);
      return false;
    } else {
      return true;
    }
  }, [list]);

  return (
    <>
      <h2>{title}</h2>
      <TableContainer>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              {column.map((c, i) => {
                return (
                  <TableCell key={i} align='left' sx={{ fontWeight: 'bold' }}>
                    {c.header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {existList ? (
            <TableBody>
              {list.map((l, i) => (
                <TableRow key={i} onClick={() => handleClickOpen(l)}>
                  <Item key={i} column={column} item={l} Desing={desing} />
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={column.length} align='center'>
                  לא נמצאו נתונים.
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {DialogComponent && selectedItem && (
        <Dialog open={open} onClose={handleClose}>
          <DialogComponent item={selectedItem} />
        </Dialog>
      )}
    </>
  );
};

export default GenericList;
