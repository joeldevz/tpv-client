import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { ButtonGroup, Button } from '@material-ui/core'
import { GetAllProductShop, DeleteProductShop } from "../../functions/connectbackend"
import TableHead from '@material-ui/core/TableHead';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AlertDialogSlide } from "../../components/app"
import { CODE_HTTP, MESSAGE } from '../../functions/code';
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(code, name, description, count, iva, price) {
    return { code, name, description, count, iva, price };
}



const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export function TabletProduct({ setProduct, refresh }) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRow] = useState([])
    const [deleteProduct, setDeleteProduct] = useState({ active: false, code: '' });
    const setDeleteProductFuntion = (option) => {
        setDeleteProduct({ ...deleteProduct, active: option })
    }
    useEffect(async () => {
        const allProducts = await GetAllProductShop()
        let data;
        if (allProducts.statusCode === 404) {
            data = []
        }
        if (allProducts.statusCode === 200) {
            data = allProducts.data.map((product) => (
                createData(
                    product.code,
                    product.name,
                    product.description,
                    product.count,
                    product.iva,
                    product.price)
            ))
        }
        setRow(data)
    }, [refresh, deleteProduct])
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleClickModifyProduct = (product) => {
        setProduct(product)
    }
    const handleClickSelectDelete = (product) => {
        setDeleteProduct({ code: product, active: true })
    }
    const handleClickDeleteProduct = async (product) => {
        let query = await DeleteProductShop(product)
        if (query.error || query.statusCode !== CODE_HTTP.SUCCESS) {
            return alert('Algo salío mal')
        }
        if (query.data === MESSAGE.NO_DELETE) {
            return alert('no Se eliminó')
        }
        setDeleteProduct({ code: '', active: false })

        return alert('Eliminado')
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre del Producto</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">IVA (%)</TableCell>
                            <TableCell align="right">Precio (€)</TableCell>
                            <TableCell align="center">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.code}>
                                <TableCell component="th" scope="row">
                                    {row.code}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.description.length >= 150 ? row.description.slice(0, 150) + '...' : row.description}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.count}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.iva} %
                            </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.price} €
                            </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    <ButtonGroup variant="contained" aria-label="contained primary button group">
                                        <Button color="secondary" onClick={() => handleClickSelectDelete(row.code)}><DeleteOutlinedIcon /></Button>
                                        <Button color="primary" onClick={() => handleClickModifyProduct(row)}>Modificar</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <AlertDialogSlide title={`¿Desea Eliminar el siguiente Producto ${deleteProduct.code}?`} active={deleteProduct.active} setActive={setDeleteProductFuntion}>
                <div className="text-center w-full">
                    <Button color="secondary" onClick={() => setDeleteProductFuntion(false)}>Cancelar</Button>
                    <Button color="primary" onClick={() => handleClickDeleteProduct({ code: deleteProduct.code })}>Eliminar</Button>
                </div>
            </AlertDialogSlide>
        </>
    );
}