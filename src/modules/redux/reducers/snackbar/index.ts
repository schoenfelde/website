import {
    DISPLAY_SNACKBAR_MESSAGE,
    DISMISS_SNACKBAR,
} from '../../actions/snackbar';
import { ReduxAction } from '../../interfaces';

export interface SnackbarState {
    type: string;
    text: string;
    open: boolean;
}

const defaultState = {
    type: 'success',
    text: '',
    open: false,
};

export default (state = defaultState, action: ReduxAction) => {
    switch (action.type) {
        case DISPLAY_SNACKBAR_MESSAGE:
            return {
                ...state,
                open: true,
                type: action.value.type,
                text: action.value.message,
            };
        case DISMISS_SNACKBAR:
            return {
                ...state,
                open: false,
                type: 'success',
                text: '',
            };
        default:
            return state;
    }
};
