import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Item from "./item";
import Dialog from '@mui/material/Dialog';
import { ComponentType } from 'react';

const GenericList = (props: {
    title: string,
    list: object[],
    column: string[],
    desing: ComponentType<{
        item: object,
        column: string[]
    }> | null,
    DialogComponent?: ComponentType<{ item: object }> 
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

    return (
        <>
            <h2>{title}</h2>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            {column.map((c, index) => (
                                <TableCell align="left" sx={{ fontWeight: "bold" }} key={index}>
                                    {c}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((l, index) => (
                            <TableRow key={index} onClick={() => handleClickOpen(l)}>
                                <Item column={column} item={l} Desing={desing} />
                            </TableRow>
                        ))}
                    </TableBody>
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
