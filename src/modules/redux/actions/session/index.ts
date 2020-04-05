import User from '../../../classes/User';
import { signOut as AuthSignOut } from '../../../auth';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_COGNITO_USER = 'SET_COGNITO_USER';

export const newUser = () =>
    new User({
        firstName: '',
        email: '',
        lastName: '',
        userType: '',
    });

export const setCurrentUser = (user: User) => ({
    type: SET_CURRENT_USER,
    value: user,
});

export const signOut = () => (dispatch: any) => {
    AuthSignOut().then(() => {
        dispatch(setCurrentUser(newUser()));
    });
};

export const setCognitoUser = (congitoUser: any) => ({
    type: SET_COGNITO_USER,
    value: congitoUser,
});
