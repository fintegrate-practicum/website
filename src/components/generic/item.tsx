import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ComponentType } from 'react';
import DateFormat from './DateFormat';

interface Item {
    [key: string]: any;
}

const Item = (props: {
    item: Item,
    column: string[],
    Desing: ComponentType<{
        item: Item,
        column: string[]
    }> | null
}) => {
    const { item, column, Desing } = props;

    return (
        <>
        {            
            Desing ? <Desing item={item} column={column}/> :
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {
                    column.map((c) => (
                        <TableCell key={c} align="right">{c === "targetDate" ? <DateFormat isoDate={item[c]} /> : item[c]}</TableCell>
                    ))
                }
            </TableRow>
        }
        </>
    );
}

export default Item;