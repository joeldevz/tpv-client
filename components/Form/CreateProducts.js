import React, { useState } from 'react';
import { Formik } from 'formik';
import { errorFormShop } from "../../functions/menssage"
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Input, Chip } from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { DropzoneArea } from 'material-ui-dropzone'
import { AddProductShop } from "../../functions/connectbackend"
import { generateCodBarras } from "../../functions"
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const names = [
    'Cargadores',
    'Cables Micro-USB',
    'Calzado',
    'Móviles',
    "Ordenadores",
];
const countries = ["HOME"]
export const FormCreateProduct = ({ setData }) => {

    const classes = useStyles();
    const [personName, setPersonName] = useState([]);
    const theme = useTheme();

    const [file, setFile] = useState({
        files: []
    })
    const handleFile = (files) => {
        setFile({
            files: files
        });
    }

    return (

        <>

            <Formik
                initialValues={{
                    code: '', name: '', count: 0, price: 0, iva: 21, description: '', service: false, provider: 'HOME', syc: {
                        web: true,
                        toodu: true
                    }
                }}
                onReset={true}
                validate={values => {
                    const errors = {};
                    if (values.code.length <= 2) {
                        errors.code = errorFormShop('code');
                        return errors
                    }
                    if (values.name.length <= 4) {
                        errors.name = errorFormShop('name');
                        return errors
                    }
                    if (values.description.length <= 0) {
                        errors.description = errorFormShop('description');
                        return errors
                    }


                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    const data = await AddProductShop(values)
                    if (data.error || data.statusCode !== CODE_HTTP.SUCCESS) {
                        return alert('np')
                    }
                    alert('Creado')
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setValues,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className={classes.root}>
                        <Grid container spacing={3}>

                            <Grid item xs={6}>
                                <h1 className="text-center font-bold text-xl">Descripción del Producto</h1>
                                <div className="my-2">
                                    <Button type="submit" variant="contained" className="w-full" color="primary" disabled={true}>
                                        Agregar Imagenes</Button>
                                </div>
                                <div className="my-2">
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}><TextField id="name" label="Nombre del Producto" onChange={handleChange} onBlur={handleBlur} value={values.name} className="w-full" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField id="labelTicket" label="Texto a Imprimir en ticket" onChange={handleChange} onBlur={handleBlur} value={values.labelTicket} className="w-full" variant="outlined" />
                                        </Grid>
                                    </Grid>

                                </div>

                                <div className="my-2">
                                    <TextField
                                        id="description"
                                        label="Descripción de Producto"
                                        multiline
                                        className="w-full"
                                        rows={4}
                                        onChange={handleChange} onBlur={handleBlur}
                                        value={values.description}
                                        variant="outlined"
                                    />
                                </div>

                                <div className="my-2">
                                    <Grid container spacing={3}>
                                        <Grid item xs={2}>
                                            <TextField id="count" type="number" label="Cantidad" onChange={handleChange} onBlur={handleBlur} value={values.count} className="w-full" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField id="price" type="number" label="Precio" onChange={handleChange} onBlur={handleBlur} value={values.price} className="w-full" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField id="code" label="Codigo de Barras" onChange={handleChange} onBlur={handleBlur} value={values.code} className="w-full" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={4}>

                                            <Button variant="contained" className="bg-gray-800 w-full h-full" color="primary" value='generar' onClick={() => setValues({ ...values, code: generateCodBarras(12) })} >Generar Codigo</Button>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FormControl variant="outlined" className="w-full">
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
                                                    <MenuItem value='21' >
                                                        21 %
                                                    </MenuItem>
                                                    <MenuItem value='10' >
                                                        10 %
                                                    </MenuItem>
                                                    <MenuItem value='4' >
                                                        4 %
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </div>

                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <h1 className="text-center font-bold text-xl">Vincular Producto</h1>
                                    <Grid container className="text-center p-5" spacing={3}>
                                        <Grid item xs={3}>
                                            <FormControlLabel
                                                control={<Switch checked={values.syc.web} disabled color="primary" id="web" onChange={handleChange} name="web" />}
                                                label="Sitio Web"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControlLabel
                                                control={<Switch checked={values.syc.web} color="primary" id="web" disabled onChange={handleChange} name="web" />}
                                                label="Toodu"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControlLabel
                                                control={<Switch checked={values.syc.web} color="primary" id="web" disabled onChange={handleChange} name="web" />}
                                                label="Shopify"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControlLabel
                                                control={<Switch checked={values.web} color="primary" id="web" disabled onChange={handleChange} name="web" />}
                                                label="Woocomerce"
                                            />
                                        </Grid>

                                    </Grid>


                                </FormGroup>
                                <div className="py-2">
                                    <FormControl variant="outlined" className="w-full">
                                        <InputLabel id="province">Proveedor</InputLabel>
                                        <Select
                                            labelId="provider"
                                            id="provider"
                                            name="provider"
                                            value={values.provider}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled
                                            label="provider"
                                        >
                                            {
                                                countries.map((contry, index) =>
                                                (<MenuItem key={index} value={contry} >
                                                    {contry}
                                                </MenuItem>)
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                {/*                                 <div className="py-2">
                                    <FormControl className="w-full" >
                                        <InputLabel id="demo-mutiple-chip-label">Categorías</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={values.category}
                                            onChange={handleChange}
                                            name="category"
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                             */}</Grid>

                        </Grid>
                        <h1 className="text-center font-bold text-red-400">
                            {errors.province && touched.province && errors.province}
                            {errors.description && touched.description && errors.description}
                            {errors.category && touched.category && errors.category}
                            {errors.name && touched.name && errors.name} </h1>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Siguente
</Button>
                    </form>
                )}
            </Formik>
        </>
    )
};