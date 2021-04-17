import Layout from "../../components/Dashboard/Layaout"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormCreateProduct } from "../../components/Form"
import { StickyHeadTable, FullScreenDialog, DataTable, TabletProduct } from "../../components/app"
import { GetAllProductShop } from "../../functions/connectbackend"
import { useState, useEffect } from "react";
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
export default function Client() {
    const [modal, newModal] = useState(false)
    const classes = useStyles();
    const [modified, setModified] = useState(false)
    const modifyProduct = (object) => {
        newModal(true)
        setModified(object)
    }

    return (
        <>
            <Layout selectNav='products'>

                <FullScreenDialog active={modal} setActive={newModal} title="Crear Producto" >
                    <FormCreateProduct dataModified={modified} setModified={setModified} />
                </FullScreenDialog>
                <div className="w-full p-4 ">
                    <TabletProduct setProduct={modifyProduct} refresh={modal} />
                    {/* <DataTable products={products} /> */}
                </div>
                <Fab color="primary" onClick={() => { setModified(false); newModal(true) }} className={classes.fab} aria-label="add">
                    <AddIcon />
                </Fab>
            </Layout>
        </>
    )
}
