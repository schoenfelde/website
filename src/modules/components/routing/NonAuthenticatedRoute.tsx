import React from 'react';
import { Route as RRoute, RouteProps, useHistory } from 'react-router-dom';
import { useCheckAuthenticated } from '../auth/Authenticated';

const NonAuthenticatedRoute = (props: RouteProps) => {
    const history = useHistory();
    const { authenticated } = useCheckAuthenticated();
    if (authenticated) {
        history.push('/dashboard');
        return null;
    } else return <RRoute {...props} />;
};

export default NonAuthenticatedRoute;
