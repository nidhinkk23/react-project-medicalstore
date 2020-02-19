import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);





const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables(props) {
    console.log("props", props);
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ProductName</StyledTableCell>
                        <StyledTableCell align="left">Brand</StyledTableCell>
                        <StyledTableCell align="left">Price</StyledTableCell>
                        <StyledTableCell align="left">Quantity</StyledTableCell>
                        <StyledTableCell align="left">Image</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map(row => (
                        <StyledTableRow key={row.pid}>
                            {row.edit ?
                                <>
                                    <StyledTableCell component="th" scope="row">
                                        <TextField id="standard-basic"defaultValue={row.pName} label="Standard" />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <TextField id="standard-basic"defaultValue={row.company} label="Standard" />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <TextField id="standard-basic"defaultValue={row.price} label="Standard" />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <TextField id="standard-basic"defaultValue={row.quantity} label="Standard" />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <TextField id="standard-basic"defaultValue={row.pImage}  label="Standard" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton >
                                            <CheckIcon onClick={() => {
                                               
                                            }
                                            } />

                                        </IconButton >

                                        <IconButton >
                                            <ClearIcon onClick={() => {
                                                
                                            }
                                            } />
                                        </IconButton >

                                    </StyledTableCell>

                                </>
                                :
                                <>
                                    <StyledTableCell component="th" scope="row">
                                        {row.pName}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.company}</StyledTableCell>
                                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                                    <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="left"><img width='50px'hight='50px' src={row.pImage} alt=""/></StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton >
                                            <DeleteOutlineIcon onClick={() => {
                                                props.delFunction(row)
                                            }
                                            } />

                                        </IconButton >

                                        <IconButton >
                                            <EditIcon onClick={() => {
                                                props.editFunction(row)
                                            }
                                            } />
                                        </IconButton >

                                    </StyledTableCell>
                                </>}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}