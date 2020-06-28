import React, {useState} from 'react';
import Alert, {Color} from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export type MessageType = Color;

interface Props {
    type: MessageType;
    text: string;
    onClose: () => void;
}


const MessageSnack = (props: Props) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.onClose();
        setOpen(false);
    };

    return (
        <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
            <Alert severity={props.type} onClose={handleClose}>{props.text}</Alert>
        </Snackbar>
    );
};

export default MessageSnack;
