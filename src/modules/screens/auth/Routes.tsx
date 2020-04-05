import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogIn from './login';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import Register from './register';
import VerifyMFA from './verifyMFA';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LogIn} />
            <Route path="/login/verify" component={VerifyMFA} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/register" component={Register} />
        </Switch>
    );
};

export default Routes;
