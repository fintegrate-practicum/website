import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ComponentType } from 'react';
import DateFormat from './DateFormat';

interface Item {
    [key: string]: any;
}
interface Column {
    name: string;
    header: string;
    type?: 'date' | 'text';
}
interface ItemProps {
    item: Item;
    column: Column[];
    Desing: ComponentType<{ item: Item, column: Column[] }> | null;
}

const Item = ({ item, column, Desing }: ItemProps) => {
    return (
        <>
        {            
            Desing ? <Desing item={item} column={column}/> :
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {
                    column.map((c) => (
                        <TableCell key={c.name} align="right">{c.type === 'date' ? <DateFormat isoDate={item[c.name]} /> : item[c.name]}</TableCell>
                    ))
                }
            </TableRow>
        }
        </>
    );
}

export default Item;