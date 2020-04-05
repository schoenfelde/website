import React from 'react';
import { BrowserRouter as RRouter, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import Auth from '../../screens/auth';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';

const Router: React.FC = () => (
    <RRouter>
        <Switch>
            <NonAuthenticatedRoute
                component={Auth}
                path={[
                    '/login',
                    '/forgot-password',
                    '/register',
                    '/reset-password',
                    '/login/verify',
                ]}
            />
            <AuthenticatedRoute path="/" component={() => <div />} />
        </Switch>
    </RRouter>
);

export default Router;
