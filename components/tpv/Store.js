import { useEffect, useState } from "react"
import { InputNumber2, FullScreenDialog, AlertDialogSlide } from "../app"
import ItemShoppinCart from "./ItemShoppinCart"
import { Paper, IconButton, InputBase, ListItem, ListItemText, Button, RadioGroup, FormControlLabel, Radio, Grid, TextField } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },


}));
const Store = ({ products, setProducts, ticket, setTicket, saveandprinter }) => {
    const classes = useStyles();
    const [userModal, setUserModal] = useState(false)
    const [methodPay, setMethodPay] = useState('cash')
    const [cash, setCash] = useState(0)
    const [devolution, setDevolution] = useState(0)
    const handleChange = (event) => {
        setTicket({ ...ticket, methodPay: event.target.value })
        setMethodPay(event.target.value)
    }
    const cashRepayment = (e) => {
        setCash(e.target.value)
        setDevolution(ticket.priceAll - e.target.value)
    }
    const [Pay, setPay] = useState(false)
    const saveTicket = (printer) => {
        if (printer) {
            saveandprinter()
        }
    }
    return (
        <>

            <div class="flex flex-col rounded-lg overflow-hidden sm:flex-row w-full" onClick={() => setUserModal(!userModal)}>
                <input disabled class="py-1  px-3 bg-gray-200 text-gray-800 w-full border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100" type="text" name="email" placeholder="Seleccionar Cliente" />
                <button class="py-3 px-4 bg-gray-900 text-gray-100 font-semibold uppercase hover:bg-gray-600">Buscar</button>
            </div>
            <FullScreenDialog title="Clientes" active={userModal} setActive={setUserModal} >
                <div className="p-2">
                    <Paper className={classes.root} >
                        <InputBase
                            className={classes.input, 'w-10/12 p-2 cursor-pointer'}
                            placeholder="Seleccionar Cliente"

                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <ListItem button>
                        <ListItemText primary="Christopher zambrano marcillo - 09824082T" secondary="Titania" ter />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </div>

            </FullScreenDialog >

            <AlertDialogSlide active={Pay} title="Metodo de Pago" setActive={setPay}>
                <RadioGroup aria-label="gender" name="gender1" value={methodPay} onChange={handleChange}>
                    <Grid container spacing={1} className="h-full">
                        <Grid item xs={12} md={6} className="h-full">
                            <FormControlLabel value="card" control={<Radio color="primary" />} label="Tarjeta" />
                        </Grid>
                        <Grid item xs={12} md={6} className="h-full">
                            <FormControlLabel value="cash" control={<Radio color="primary" />} label="Efectivo" />
                        </Grid>
                    </Grid>
                </RadioGroup>
                <div className="w-full mt-8">
                    {methodPay === 'cash' ?

                        <Grid container spacing={1} className="h-full">
                            <Grid item xs={12} md={6} className="h-full">
                                <TextField id="name" type="number" disabled label="Total a Pagar" value={ticket.priceAll} className="w-full mb-2" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6} className="h-full">
                                <TextField id="name" type="number" label="Dinero Dado" onChange={cashRepayment} value={cash} className="w-full" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={12} className="h-full">
                                <TextField id="name" type="number" label="Devolución" disabled value={devolution} className="w-full" variant="outlined" />
                            </Grid>
                        </Grid>


                        :
                        <Grid container spacing={1} className="h-full">

                            <Grid item xs={12} md={12} className="h-full">
                                <TextField id="name" type="number" label="Total a Pagar" disabled value={ticket.priceAll} className="w-full " variant="outlined" />
                            </Grid>
                        </Grid>}
                </div>
                <div className="w-full mt-8">
                    <Grid container spacing={1} className="h-full m-auto">
                        <Grid item xs={12} md={4} className="h-full">
                            <Button variant="outlined" className="w-full" onClick={() => setPay(false)} color="secondary">
                                No Guardar</Button>
                        </Grid>
                        <Grid item xs={12} md={4} className="w-full">
                            <Button variant="contained" onClick={() => saveTicket()} className="w-full" color="primary">
                                Guardar</Button>
                        </Grid>
                        <Grid item xs={12} md={4} className="w-full">
                            <Button onClick={() => saveTicket(true)} variant="contained" className="w-full" color="primary">
                                Guardar e Imprimir </Button>
                        </Grid>
                    </Grid>
                </div>
            </AlertDialogSlide>
            <div className="overflow-auto mt-5" style={{ height: 70 + '%' }}>
                <div class="m-auto  grid grid-cols-1  gap-2 overflow-y-auto p-2">
                    <ItemShoppinCart products={products} setProducts={setProducts} />
                </div>
            </div>
            <div className="">
                <div className="grid grid-cols-4 gap-2 mb-2">
                    <div>
                        <InputNumber2 disabled={true} placeholder="Código" className="" value={ticket.descound} text="Descuento" />
                    </div>
                    <div>
                        <InputNumber2 disabled={true} placeholder="Total" className="" value={ticket.priceAll} text="Total" />
                    </div>
                </div>
                <Button variant="contained" color="primary" onClick={() => setPay(!Pay)} className=' hover:bg-blue-700 bg-blue-600 w-full'>
                    Pagar
</Button>

            </div>
        </>
    )
}
export default Store