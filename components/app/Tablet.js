
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { SplitButton } from "./Button"
import { DataGrid } from '@material-ui/data-grid';
import { GetAllProductShop } from "../../functions/connectbackend"



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 500,
    },
});

export function StickyHeadTable() {
    const columns = [
        { id: 'document', label: 'Document', minWidth: 100 },

        { id: 'name', label: 'Nombre y Apellidos', minWidth: 170 },
        {
            id: 'mobile',
            label: 'Móvil',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'email',
            label: 'Correo Electónico',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'size',
            label: 'Size\u00a0(km\u00b2)',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },


    ];

    function createData(document, name, mobile, email, size) {
        return { document, name, mobile, email, size };
    }

    const rows = [
        createData('xxxxxx', 'Christopher joel zambrano marcilloasdasdasdasdadasdasdasd', '643672659', 'cjzm89@gmail.com', 3287263),

    ];
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root, 'h-full'}>
            <TableContainer className={classes.container, 'h-full'}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.document}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                {/* column.id === 'action' ? <SplitButton /> : '' */}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />

        </Paper>
    );
}


export function DataTable({ products }) {
    console.log(products)
    const [rows, setRow] = useState([])
    useEffect(async () => {
        const allProducts = await GetAllProductShop()
        if (allProducts.statusCode === 200) {
            const data = allProducts.data.map((product) => (
                {
                    id: product.code,
                    name: product.name,
                    description: product.description,
                    count: product.count,
                    iva: product.iva,
                    price: product.price
                }
            ))
            setRow(data)
        }
    }, [])



    const columns = [
        { field: 'id', headerName: 'Código de Barras', width: 230 },
        { field: 'name', headerName: 'Nombre de Producto', width: 230 },
        { field: 'description', headerName: 'Descripción', width: 230 },
        {
            field: 'price',
            headerName: 'Precio (€)',
            type: 'number',
            width: 130,

        },
        {
            field: 'iva',
            headerName: 'IVA (%)',
            type: 'number',
            width: 130,

        },
        {
            field: 'count',
            type: 'number',
            headerName: 'Stock',
            description: 'Total de Productos en Tienda',
            width: 160,

        },
    ];

    console.log(rows)
    return (
        <div style={{ height: 550, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
        </div>
    );
}

export function DataTableTicket({ products }) {
    const [rows, setRow] = useState([])
    useEffect(async () => {
        const allProducts = await GetAllProductShop()
        if (allProducts.statusCode === 200) {
            const data = allProducts.data.map((product) => (
                {
                    id: product.code,
                    name: product.name,
                    description: product.description,
                    count: product.count,
                    iva: product.iva,
                    price: product.price
                }
            ))
            setRow(data)
        }
    }, [])



    const columns = [
        { field: 'id', headerName: 'Nº Ticket', width: 230 },
        { field: 'name', headerName: 'Nombre de Producto', width: 230 },
        { field: 'description', headerName: 'Descripción', width: 230 },
        {
            field: 'price',
            headerName: 'Precio (€)',
            type: 'number',
            width: 130,

        },
        {
            field: 'iva',
            headerName: 'IVA (%)',
            type: 'number',
            width: 130,

        },
        {
            field: 'count',
            type: 'number',
            headerName: 'Stock',
            description: 'Total de Productos en Tienda',
            width: 160,

        },
    ];

    console.log(rows)
    return (
        <div style={{ height: 550, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
        </div>
    );
}