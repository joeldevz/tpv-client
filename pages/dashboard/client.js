import Layout from "../../components/Dashboard/Layaout"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { StickyHeadTable, FullScreenDialog } from "../../components/app"

import { useState } from "react";
export default function Client() {
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
                <Fab color="primary" onClick={() => newClient(true)} className={classes.fab} aria-label="add">
                    <AddIcon />
                </Fab>
                <FullScreenDialog active={client} setActive={newClient} title="Crear Cliente" />
                <div className="w-full p-4 ">

                    <StickyHeadTable />
                </div>
            </Layout>
        </>
    )
}
