import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ComponentType } from 'react';
import DateFormat from './dateFormat';
import { Column } from './genericList';
interface Item {
  [key: string]: any;
}

interface ItemProps {
  item: Item;
  column: Column[];
  Desing: ComponentType<{ item: Item; column: Column[] }> | null;
}

const Item = ({ item, column, Desing }: ItemProps) => {
  return (
    <>
      {Desing ? (
        <Desing item={item} column={column} />
      ) : (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          {column.map((c) => (
            <TableCell key={c.name} align='left'>
              {c.type === 'date' ? (
                <DateFormat isoDate={item[c.name]} />
              ) : (
                item[c.name]
              )}
            </TableCell>
          ))}
        </TableRow>
      )}
    </>
  );
};

export default Item;
