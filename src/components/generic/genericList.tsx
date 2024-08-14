import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Item from './item';
import { ComponentType, useMemo } from 'react';

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
}) => {
  const { title, list, column, desing } = props;

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
                <Item key={i} column={column} item={l} Desing={desing} />
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
    </>
  );
};

export default GenericList;
