import {
    SET_CURRENT_USER,
    SET_COGNITO_USER,
    newUser,
} from '../../actions/session';
import { ReduxAction } from '../../interfaces';
import User from '../../../classes/User';
import { REHYDRATE } from 'redux-persist';

export interface SessionState {
    user: User;
    cognitoUser?: any;
}

const defaultState = {
    user: newUser(),
};

export default (state = defaultState, action: ReduxAction) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.value,
            };
        case SET_COGNITO_USER:
            return {
                ...state,
                cognitoUser: action.value,
            };
        case REHYDRATE:
            if ((action as any).payload && (action as any).payload.session) {
                return {
                    ...state,
                    user: new User((action as any).payload.session.user),
                };
            }
            return state;
        default:
            return state;
    }
};
