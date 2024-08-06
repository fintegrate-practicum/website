import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Item from "./item";
import { ComponentType, useEffect, useState } from 'react';

const GenericList = (props: {
    title: string,
    list: object[],
    column: string[],
    desing: ComponentType<{
        item: object,
        column: string[]
    }> | null}) => {

    const {title, list, column, desing} = props
    const [existList, setExistList] = useState(true);

    useEffect(() => {
        if (!Array.isArray(list) || list.length == 0) {
            console.error("Expected 'list' to be an array but got:", list);
            setExistList(false);
        } else {
            setExistList(true);
        }
    }, [list]);

    return(
        <>
        <h2>{title}</h2>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        {
                            column.map((c,i)=>{
                                return(<TableCell key={i} align="right" sx={{fontWeight: "bold"}}>{c==="taskName"?'שם המשימה:':(c==="targetDate"?'תאריך יעד:':(c==='urgency'?'דחיפות:':c))}</TableCell>)
                            })
                        }
                    </TableRow>
                    </TableHead>
                    {existList ? (
                        <TableBody>
                            {
                                list.map((l, index) => (
                                    <Item key={index} column={column} item={l} Desing={desing}/>
                                ))
                            }
                        </TableBody>) : (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={column.length} align="center">לא נמצאו נתונים.</TableCell>
                            </TableRow>
                        </TableBody>)
                    }
                </Table>
            </TableContainer>
        </>
    )
}

export default GenericList;