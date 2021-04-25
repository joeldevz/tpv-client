import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Input, Chip } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { GetProductShop } from '../../functions/connectbackend';
import { CODE_HTTP } from '../../functions/code';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5),
            width: '100%',
        },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));



const iva = [
    21,
    4,
    10,

];
export const AddProduct = ({ setProducts, products }) => {
    const classes = useStyles();

    return (
        <>
            <Formik
                initialValues={{ code: '', title: '', count: 0, price: 0, category: 'inbox', iva: 21 }}
                validate={(values) => {
                    const errors = {};
                    if (values.title.length === 0) {
                        errors.title = "nombre"
                    }
                    if (values.count === 0) {
                        errors.count = "cantidad"
                    }
                    return errors

                }}
                onSubmit={(values, { setSubmitting, setValues }) => {
                    setProducts([...products, { ...values, key: products.length }])
                    setValues({ code: '', title: '', count: 0, price: 0, category: 'inbox', iva: 21 })
                    setSubmitting(false)
                }}

            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting, setStatus, setValues
                    /* and other goodies */
                }) => {
                    const searchProduct = async (e) => {
                        e.preventDefault()
                        const data = await GetProductShop(values.code)
                        console.log(data)
                        if (data.error === true || data.statusCode !== CODE_HTTP.SUCCESS) {
                            return alert("no found")
                        }
                        setValues({ code: data.data.code, title: data.data.name, count: 1, price: data.data.price, category: 'inbox', iva: data.data.iva })
                    }
                    return (
                        <>
                            <form onSubmit={searchProduct} className="w-full col-span-2">
                                <TextField id="code" value={values.code} label="Código" onChange={handleChange} onBlur={handleBlur} className="w-full" variant="outlined" />
                            </form>
                            <div className="grid col-span-10 grid-cols-9 gap-2">
                                <form onSubmit={handleSubmit} className={classes.root, 'grid col-span-10 grid-cols-9 gap-2'}>

                                    <TextField id="title" label="Nombre de Producto" onChange={handleChange} onBlur={handleBlur} value={values.title} className="w-full col-span-3" variant="outlined" />
                                    <TextField type="number" id="count" size='4' label="Cantidad" onChange={handleChange} onBlur={handleBlur} value={values.count} className="w-full col-span-2" variant="outlined" />
                                    <TextField type="number" id="price" label="Precio" onChange={handleChange} onBlur={handleBlur} value={values.price} className="w-full col-span-2" variant="outlined" />


                                    <FormControl variant="outlined" className="w-full  col-span-2">
                                        <InputLabel id="province">IVA</InputLabel>
                                        <Select
                                            labelId="iva"
                                            id="iva"
                                            name="iva"
                                            value={values.iva}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label="iva"

                                        >
                                            {
                                                iva.map((iva, index) =>
                                                (<MenuItem key={index} value={iva} >
                                                    {iva} %
                                                </MenuItem>)
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <Button type="submit" className='col-span-3' variant="contained" color="primary" disabled={isSubmitting}>
                                        Guardar</Button>
                                </form>
                            </div>
                        </>

                    )
                }}
            </Formik>
        </>
    )
};