import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useEffect, useState } from "react"

function Alerts(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const Alert = ({ option }) => {
    const { Alert, setAlert } = option
    const handleClose = () => {
        setAlert({
            active: false,
            color: '',
            msg: '',
            time: 6000
        })
    }

    return (
        <Snackbar open={Alert.active} autoHideDuration={Alert.time} onClose={handleClose}>
            <Alerts onClose={handleClose} >
                {Alert.msg}</Alerts>
        </Snackbar>
    )
}