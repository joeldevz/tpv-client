import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { CardShopIconLabel } from "../../app"
import { useEffect, useState } from 'react';

export default function () {
    let f = new Date();
    const meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    const [PricesDefault, setPricesDefault] = useState({ CashEffective: 0, CashCard: 100 })
    const [Price, setPrice] = useState({ CashEffective: "", CashCard: "", error: "" })

    const HandlerChangePrice = (element) => {
        setPrice({ ...Price, [`${element.target.name}`]: isNaN(parseInt(element.target.value)) ? 0 : parseInt(element.target.value), error: "" })

        //Check()
    }
    const Check = () => {
        try {
            ComparitePrice("Efectivo", { number: PricesDefault.CashEffective, number2: Price.CashEffective })
            ComparitePrice("Tarjeta", { number: PricesDefault.CashCard, number2: Price.CashCard })
        } catch (error) {
            setPrice({ ...Price, error: error })
            return
        }
    }
    const ComparitePrice = (label, options) => {
        const { number, number2 } = options
        if (number < number2) {
            throw `Sobra Dinero ${label}`;
        } else if (number > number2) {
            throw `Falta Dinero ${label}`
        }
        return true
    }
    useEffect(() => {
        Check()

    }, [Price.CashEffective, Price.CashCard])
    return (

        <Paper className="h-full p-3">
            <h2 className="font-bold text-lg text-center">Cierre de Caja {f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()}</h2>
            <Grid container>
                <Grid item xs={4}>
                    <CardShopIconLabel small={PricesDefault.CashEffective} icon={<LocalAtmIcon />} uri="#" color="green" label="Facturado en Efectivo" />
                </Grid>
                <Grid item xs={4}>
                    <CardShopIconLabel small={PricesDefault.CashCard} icon={<PaymentIcon />} uri="#" color="blue" label="Facturado en Tarjeta" />
                </Grid>
                <Grid item xs={4}>
                    <CardShopIconLabel small={PricesDefault.CashCard} icon={<AccountBalanceWalletIcon />} uri="#" color="red" label="Facturado en App" />
                </Grid>
            </Grid>
            <hr className="my-2" />
            <div>
                <Grid container >
                    <Grid item xs={6}>
                        <div className="text-center"><TextField id="CashEffective" name="CashEffective" value={Price.CashEffective} onChange={HandlerChangePrice} label="Efectivo" variant="outlined" /></div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="text-center"><TextField id="CashCard" name="CashCard" onChange={HandlerChangePrice} label="Tarjeta" value={Price.CashCard} variant="outlined" /></div>
                    </Grid>
                </Grid>
                <p className="text-xl font-bold text-center text-red-600" >{Price.error.length > 0 ? `¡¡${Price.error}!!` : ''}</p>
            </div>
        </Paper>
    )
}