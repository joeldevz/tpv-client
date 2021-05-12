import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

export default function BasicTable({ rows, values, setValues, allSum, ObjectValues }) {
    const classes = useStyles();
    const HandlerChangeValues = (e) => {
        console.log()
        setValues({
            ...values, [e.target.id]: {
                ...values[e.target.id],
                value: parseInt(e.target.value)
            }
        })
    }
    const HandlerClickReset = () => {
        setValues(ObjectValues)
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                <Button onClick={HandlerClickReset}>Resetear</Button>
                            </ButtonGroup>

                        </TableCell>
                        <TableCell align="left"><h2 className="text-center font-bold text-lg">Total: {allSum}€</h2></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row}>
                            <TableCell component="th" scope="row">
                                {row}
                            </TableCell>
                            <TableCell>
                                <TextField type="number" id={row} onChange={HandlerChangeValues} value={values[row].value} align="center" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
