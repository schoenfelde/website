import React from 'react';
import { Route } from 'react-router-dom';
import Authenticated from '../auth/Authenticated';
interface IAuthenticatedRoute {
    path: string;
    component: React.FC;
}
const AuthenticatedRoute: React.FC<IAuthenticatedRoute> = props => {
    const AuthenticatedComponent = Authenticated(props.component);
    return (
        <Route path={props.path}>
            <AuthenticatedComponent />
        </Route>
    );
};

export default AuthenticatedRoute;
