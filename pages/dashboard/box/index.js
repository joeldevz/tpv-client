import Layout from "../../../components/Dashboard/Layaout"

import { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import CloseBox from "../../../components/Dashboard/box/CloseBox"
import EndBox from "../../../components/table/EndBox"
export default function Ticket() {
    const ObjectValues = { "1 Cent": { value: 0, operation: 0.01 }, "2 Cent": { value: 0, operation: 0.02 }, "5 Cent": { value: 0, operation: 0.05 }, "10 Cent": { value: 0, operation: 0.10 }, "20 Cent": { value: 0, operation: 0.20 }, "50 Cent": { value: 0, operation: 0.50 }, "1 €": { value: 0, operation: 1 }, "2 €": { value: 0, operation: 2 }, "5 €": { value: 0, operation: 5 }, "10 €": { value: 0, operation: 10 }, "20 €": { value: 0, operation: 20 }, "50 €": { value: 0, operation: 50 }, "100 €": { value: 0, operation: 100 }, "200 €": { value: 0, operation: 200 } }
    const [all, setAll] = useState(0)
    const [values, setValues] = useState(ObjectValues)
    const [rows, setRows] = useState(["1 Cent", "2 Cent", "5 Cent", "10 Cent", "20 Cent", "50 Cent", "1 €", "2 €", "5 €", "10 €", "20 €", "50 €", "100 €", "200 €"])
    useEffect(() => {
        SumAll()

    }, [values])
    const SumAll = () => {
        let sum = 0
        rows.forEach((row) => {
            if (!isNaN(parseInt(values[row].value))) {
                sum += values[row].value * values[row].operation
            }
        })
        if (sum !== NaN) {
            setAll(sum.toFixed(2))
            return
        }
        setAll(0)
    }
    return (
        <>
            <Layout selectNav='dashboard'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <EndBox values={values} setValues={setValues} allSum={all} rows={rows} ObjectValues={ObjectValues} />
                    </Grid>
                    <Grid item xs={9} >
                        <CloseBox />
                    </Grid>
                </Grid>
            </Layout>
        </>
    )
}
