import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ComponentType } from 'react';

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
                        <TableCell key={c} align="left">{item[c]}</TableCell>
                    ))
                }
            </TableRow>
        }
        </>
    );
}

export default Item;