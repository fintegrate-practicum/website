import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Item = (props) => {

    const item = props.item;
    const column = props.column;

    return(
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {
                column.map((c)=>{
                    return(<TableCell align="left">{item[c]}</TableCell>)
                })
            }
        </TableRow>
        </>
    )
}

export default Item;