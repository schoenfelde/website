import React from 'react';
import {
    useTheme,
    SnackbarContent,
    Snackbar as MUISnackBar,
    Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/store';

const Snackbar = () => {
    const theme = useTheme();
    const message = useSelector((state: ApplicationState) => state.snackbar);
    return (
        <MUISnackBar open={message.open}>
            <SnackbarContent
                style={{
                    backgroundColor:
                        message.type === 'success'
                            ? theme.palette.primary.main
                            : theme.palette.error.main,
                }}
                message={
                    <Typography style={{ color: 'white', width: '100%' }}>
                        {message.text}
                    </Typography>
                }
            />
        </MUISnackBar>
    );
};

export default Snackbar;
