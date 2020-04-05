import { Dispatch } from 'redux';

export const DISPLAY_SNACKBAR_MESSAGE = 'DISPLAY_POPUP_MESSAGE';
export const DISMISS_SNACKBAR = 'DISMISS_SNACKBAR';
const DEFAULT_SNACKBAR_DISMISS_TIMEOUT = 3000;
export const displaySnackbarMessage = (
    type: 'success' | 'failure',
    message: string,
) => (dispatch: Dispatch) => {
    dispatch({ type: DISPLAY_SNACKBAR_MESSAGE, value: { type, message } });
    setTimeout(
        () => dispatch(dismissSnackbar()),
        DEFAULT_SNACKBAR_DISMISS_TIMEOUT,
    );
};
export const dismissSnackbar = () => ({ type: DISMISS_SNACKBAR });
