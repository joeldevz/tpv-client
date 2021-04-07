import React, { useState } from 'react';
import { Formik } from 'formik';
import { errorFormShop } from "../../functions/menssage"
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
    'Tecnología',
    'Ropa',
    'Calzado',
    'Móviles',
    "Ordenadores",
];
const countries = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"]
export const FormCreateShop = ({ setStep, setDataShop }) => {
    const classes = useStyles();
    const [personName, setPersonName] = useState([]);
    const theme = useTheme();


    return (

        <div>
            <h1 className="text-center font-bold text-xl">Crear Tienda</h1>
            <Formik
                initialValues={{ name: '', address: '', city: "", province: "", cp: "", country: 58, category: [], }}
                validate={values => {
                    const errors = {};
                    if (values.name.length <= 4) {
                        errors.name = errorFormShop('name');
                        return errors
                    }
                    if (values.address.length <= 4) {
                        errors.address = errorFormShop('address');
                        return errors
                    }
                    if (values.city <= 0) {
                        errors.city = errorFormShop('city');
                        return errors
                    }
                    if (values.province <= 0) {
                        errors.province = errorFormShop('province');
                        return errors
                    }
                    if (values.category.length <= 0) {
                        errors.province = errorFormShop('category');
                        return errors
                    }

                }}
                onSubmit={(values, { setSubmitting }) => {
                    setDataShop(values)
                    setStep(1)
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

                        <TextField id="name" label="Nombre de Tienda" onChange={handleChange} onBlur={handleBlur} value={values.name} className="w-full" variant="outlined" />
                        <TextField id="address" label="Dirección" onChange={handleChange} onBlur={handleBlur} value={values.address} className="w-full" variant="outlined" />
                        <TextField type="number" id="cp" label="Codigo Postal" onChange={handleChange} onBlur={handleBlur} value={values.cp} className="w-full" variant="outlined" />

                        <FormControl variant="outlined" className="w-full">
                            <InputLabel id="province">País</InputLabel>
                            <Select
                                disabled
                                labelId="country"
                                id="country"
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="country"

                            >
                                {
                                    countries.map((contry, index) =>
                                    (<MenuItem key={index} value={index} >
                                        {contry}
                                    </MenuItem>)
                                    )
                                }
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className="w-full">
                            <InputLabel id="province">Province</InputLabel>
                            <Select
                                labelId="province"
                                id="province"
                                name="province"
                                value={values.province}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="province"
                            >

                                <MenuItem value={1}>Madrid</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className="w-full">
                            <InputLabel id="city">Ciudad</InputLabel>
                            <Select
                                labelId="city"
                                id="city"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Ciudad"
                            >
                                <MenuItem value={1}>Alcalá de Henares</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className="w-full" >
                            <InputLabel id="demo-mutiple-chip-label">Categorias</InputLabel>
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
                        <h1 className="text-center font-bold text-red-400">{errors.province && touched.province && errors.province} {errors.city && touched.city && errors.city} {errors.address && touched.address && errors.address} {errors.name && touched.name && errors.name} </h1>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Siguente
</Button>
                    </form>
                )}
            </Formik>
        </div>
    )
};