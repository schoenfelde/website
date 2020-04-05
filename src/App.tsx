import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, green } from '@material-ui/core/colors';
import Router from './modules/components/routing';
import Snackbar from './modules/components/snackbar';
import withProvider from './modules/redux/withProvider';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: green,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router />
            <Snackbar />
        </ThemeProvider>
    );
}

export default withProvider(App);
