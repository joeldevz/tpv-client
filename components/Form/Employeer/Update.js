import React, { useState } from 'react';
import { Formik } from 'formik';
import { errorCreateEmployeer } from "../../../functions/menssage"
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Input, Chip } from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
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


const FormUpdateEmployeer = ({ setStep, setDataAdmin }) => {
    const classes = useStyles();


    return (

        <div>
            <h1 className="text-center">Crear Admin</h1>
            <Formik
                initialValues={{ name: 'Admin', pin: '', pinverify: "" }}
                validate={(values) => {
                    const errors = {};
                    console.log(values.pin)
                    if (values.pin.length < 4) {

                        errors.pin = errorCreateEmployeer('pin');
                        return errors
                    }
                    if (values.pinverify.length < 4) {
                        errors.pin = errorCreateEmployeer('pin');
                        return errors
                    }
                    if (values.pin !== values.pinverify) { errors.pinverify = errorCreateEmployeer('pinverify'); return errors }
                }}
                onSubmit={(values, { setSubmitting }) => {

                    alert(JSON.stringify(values));
                    setSubmitting(false);
                    setDataAdmin(values)
                    setStep(2)
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
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className={classes.root}>

                        <TextField id="admin" label="Nombre de Usuario" disabled onChange={handleChange} onBlur={handleBlur} value={values.name} className="w-full" variant="outlined" />
                        <TextField type="number" id="pin" size='4' label="Pin" onChange={handleChange} onBlur={handleBlur} value={values.pin} className="w-full" variant="outlined" />
                        <TextField type="number" id="pinverify" label="Verificar Pin" onChange={handleChange} onBlur={handleBlur} value={values.pinverify} className="w-full" variant="outlined" />
                        <h1 className="text-center font-bold text-red-400">{errors.pin && touched.pin && errors.pin} {errors.pinverify && touched.pinverify && errors.pinverify} </h1>
                        {console.log(errors)}
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Siguente
</Button>
                    </form>
                )}
            </Formik>
        </div>
    )
};
export default FormUpdateEmployeer