import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import SetUpProfile from './setUpProfile';

const Routes = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/profile`} component={SetUpProfile} /> 
        </Switch>
    );
};

export default Routes;
