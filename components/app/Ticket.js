import React, { useEffect, useState } from 'react';
import moment from "moment"
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

function createData(NTicket, document, NProducts, iva, total, history, date) {
    return {
        date,
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




export function CollapsibleTableTicket() {
    const [rows, setRows] = useState([])
    const [moth, setMoth] = useState("");
    const GetAndFormat = async () => {
        const allTicket = await GetAllTicket()
        if (allTicket.statusCode === 200) {
            const data = allTicket.data.map((ticket) => {
                /*                 [
                                    { date: '2020-01-05', name: '11091700', count: 3, iva: 21, price: 1 },
                                    { date: '2020-01-02', name: 'Anonymous', count: 1, iva: 10, price: 1 },
                                ] */
                const history = []
                for (const product of ticket.products) {
                    history.push({ date: ticket.createdAt, name: product.name, count: product.count, iva: product.iva, price: product.price })
                }

                return createData(
                    ticket.Nticket,
                    ticket.client.document,
                    ticket.products.length,
                    0,
                    ticket.priceAll,
                    history,
                    ticket.createdAt)
            })
            return data
        }
    }

    const printer = async (code) => {
        const DataTicket = await GetOneTicket(code)
        if (DataTicket.statusCode !== CODE_HTTP.SUCCESS) {
            alert("Error al Buscar Ticket")
        }
        await Sendprinter(DataTicket.data)
    }
    useEffect(async () => {
        const _rows = await GetAndFormat();
        if (moth === "") return setRows(_rows)
        const _rowsFilter = []
        _rows.map((item) => {
            const dateTicket = moment(item.date.split("T")[0])
            const Date = moment(moth)
            if (moment(dateTicket).isSameOrAfter(Date))
                _rowsFilter.push(item)
        })
        console.log("filter", _rowsFilter)
        setRows(_rowsFilter)
    }, [moth])
    const change = (v) => {
        console.log(v.target.value);
        setMoth(v.target.value)
    }

    return (
        <TableContainer component={Paper}>
            Seleciona un mes :
             <br/>
            <select onChange={change}>
                <option value="">Nada</option>
                <option value="2021-01-01">Enero 2020</option>
                <option value="2021-02-01">Febrero 2020</option>
                <option value="2021-03-01">Marzo 2021</option>
                <option value="2021-04-01">Abril 2021</option>
                <option value="2021-05-01">Mayo 2021</option>
                <option value="2021-06-01">Junio 2021</option>
                <option value="2021-07-01">Julio 2021</option>
                <option value="2021-08-01">Agosto 2021</option>
                <option value="2021-09-01">Septiembre 2021</option>
                <option value="2021-10-01">Octubre 2021</option>
                <option value="2021-11-01">Noviembre 2021</option>
                <option value="2021-12-01">Diciemnre 2021</option>
            </select>
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