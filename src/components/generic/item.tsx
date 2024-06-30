import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ComponentType } from 'react';

const Item = (props: {
    item: object,
    column: string[],
    Desing: ComponentType<{
        item: object,
        column: string[]
    }> | null
}) => {
    const { item, column, Desing } = props;

    return(
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
