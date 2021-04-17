import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FullScreenDialog = ({ title, active, setActive, children }) => {
    const classes = useStyles();

    const handleClickOpen = () => {
        setActive(true);
    };

    const handleClose = () => {
        setActive(false);
    };

    return (
        <div>

            <Dialog fullScreen open={active} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} style={{ backgroundColor: '#111827' }}>
                    <Toolbar className="bg-gray-900">
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {title}</Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save</Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {children}
                </List>
            </Dialog>
        </div>
    );
}

export const AlertDialogSlide = ({ title, active, setActive, children }) => {

    const handleClose = () => {
        setActive(false);
    };

    return (
        <div>

            <Dialog
                open={active}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
    );
}