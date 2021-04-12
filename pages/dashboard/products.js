import Layout from "../../components/Dashboard/Layaout"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormCreateProduct } from "../../components/Form"
import { StickyHeadTable, FullScreenDialog, DataTable } from "../../components/app"
import { GetAllProductShop } from "../../functions/connectbackend"
import { useState, useEffect } from "react";
export default function Client() {
    const [products, setProducts] = useState([])

    const [client, newClient] = useState(false)
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
            position: 'relative',
            minHeight: 200,
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },

    }));
    const classes = useStyles();

    return (
        <>
            <Layout selectNav='client'>

                <FullScreenDialog active={client} setActive={newClient} title="Crear Producto" >
                    <FormCreateProduct />
                </FullScreenDialog>
                <div className="w-full p-4 ">

                    <DataTable products={products} />
                </div>
                <Fab color="primary" onClick={() => newClient(true)} className={classes.fab} aria-label="add">
                    <AddIcon />
                </Fab>
            </Layout>
        </>
    )
}
