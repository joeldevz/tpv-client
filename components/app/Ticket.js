import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { GetAllTicket } from "../../functions/connectbackend"
import PrintIcon from '@material-ui/icons/Print';
import { ButtonGroup, Button } from '@material-ui/core'
import { Sendprinter, GetOneTicket } from "../../functions/connectbackend"
import { CODE_HTTP } from '../../functions/code';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(NTicket, document, NProducts, iva, total, history) {
    return {
        NTicket,
        document,
        NProducts,
        iva,
        total,
        history,
    };
}

function Row(props) {
    const { row, printer } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.NTicket}
                </TableCell>
                <TableCell align="right">{row.document}</TableCell>
                <TableCell align="right">{row.NProducts}</TableCell>
                <TableCell align="right">{row.iva} %</TableCell>
                <TableCell align="right">{row.total} €</TableCell>
                <TableCell align="center">
                    <ButtonGroup variant="contained" aria-label="contained primary button group">
                        <Button color="primary" onClick={() => printer(row.NTicket)}><PrintIcon /></Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">IVA (%) </TableCell>
                                        <TableCell align="right">Precio Unidad </TableCell>

                                        <TableCell align="right">Total Precio (€)</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.name}</TableCell>
                                            <TableCell align="right">{historyRow.count}</TableCell>
                                            <TableCell align="right">{historyRow.iva} %</TableCell>
                                            <TableCell align="right">{historyRow.price}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.count * historyRow.price)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}




export function CollapsibleTableTicket({ }) {
    const [rows, setRows] = useState([])
    useEffect(async () => {
        const allTicket = await GetAllTicket()
        if (allTicket.statusCode === 200) {
            const data = allTicket.data.map((product) => {
                /*                 [
                                    { date: '2020-01-05', name: '11091700', count: 3, iva: 21, price: 1 },
                                    { date: '2020-01-02', name: 'Anonymous', count: 1, iva: 10, price: 1 },
                                ] */
                const history = []
                for (const product of product.products) {
                    history.push({ date: product.createdAt, name: product.name, count: product.count, iva: product.iva, price: product.price })
                }

                return createData(
                    product.Nticket,
                    product.client.document,
                    product.products.length,
                    0,
                    product.priceAll,
                    history)
            })
            setRows(data)
        }
    }, [])
    const printer = async (code) => {
        const DataTicket = await GetOneTicket(code)
        if (DataTicket.statusCode !== CODE_HTTP.SUCCESS) {
            alert("Error al Buscar Ticket")
        }
        console.log(DataTicket.data)
        await Sendprinter(DataTicket.data)
    }
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Nº ticket</TableCell>
                        <TableCell align="right">Documento</TableCell>
                        <TableCell align="right">Nº Productos</TableCell>
                        <TableCell align="right">IVA (%)</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="center">Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.NTicket} printer={printer} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}