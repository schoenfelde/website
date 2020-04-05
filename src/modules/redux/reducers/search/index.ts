import { SET_SEARCH, CLEAR_SEARCH } from '../../actions/search';
import { ReduxAction } from '../../interfaces';

export interface SearchState {
    text: string;
}

const defaultState = {
    text: '',
};

export default (state = defaultState, action: ReduxAction) => {
    switch (action.type) {
        case SET_SEARCH:
            return {
                ...state,
                text: action.value.text,
            };
        case CLEAR_SEARCH:
            return {
                ...state,
                text: '',
            };
        default:
            return state;
    }
};
