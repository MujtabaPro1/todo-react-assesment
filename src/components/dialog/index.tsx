import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Alert(props: {
    heading: string,
    content: string,
    onAccept: Function,
    onClose: Function,
    open: boolean
}) {

    useEffect(()=>{

    },[props])


    return (
        <div>
            <Dialog
                open={props.open}
                onClose={()=>{
                    props.onClose()
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.heading}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        props.onClose();
                    }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                        props.onAccept();
                    }} color="primary" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
