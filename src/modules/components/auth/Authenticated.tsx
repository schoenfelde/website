import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/store';
export const useCheckAuthenticated = () => {
    const currentUser = useSelector((s: ApplicationState) => s.session.user);
    return { authenticated: currentUser.isActive() };
};
const Authenticated = (WrappedComponent: any) => {
    const AuthenticatedComponent = () => {
        const history = useHistory();
        const { authenticated } = useCheckAuthenticated();
        if (!authenticated) {
            history.push('/login');
            return null;
        } else {
            return <WrappedComponent />;
        }
    };

    return AuthenticatedComponent;
};

export default Authenticated;
