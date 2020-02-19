import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';

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
    tableHead:{
        // backgroundColor:"blue"
    }
});

export default function CustomizedTables(props) {
    console.log("data in ui ", props.data);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow className={classes.tableHead}>
                        <StyledTableCell>FirstName</StyledTableCell>
                        <StyledTableCell align="left">LastName</StyledTableCell>
                        <StyledTableCell align="left">Gender</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map(row => (
                        <StyledTableRow hover key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.firstName}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                            <StyledTableCell align="left">{row.gender}</StyledTableCell>
                            <StyledTableCell align="left">{row.email}</StyledTableCell>
                            <StyledTableCell align="left">
                                <IconButton >
                                    <DeleteOutlineIcon onClick={()=>{
                                        props.deleteUser(row)
                                    }} />
                                </IconButton >
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}