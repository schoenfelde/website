import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import TextField from '../../../components/ui/Input';
import { useHistory } from 'react-router-dom';
import { useForm, emailValidator } from '../../../components/form';
import { signIn } from '../../../auth';
import SubmitButton from '../../../components/ui/SubmitButton';
import Link from '../../../components/ui/Link';
import { setCognitoUser } from '../../../redux/actions/session';
import { useDispatch } from 'react-redux';

const LogIn: React.FC = (props: any) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        values,
        handleChange,
        errors,
        submitting,
        handleSubmit,
        hasErrors,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validations: {
            email: emailValidator,
        },
        errorReducer: err => {
            return {
                email: 'Invalid Username or Password.',
            };
        },
        onSuccess: () => history.push('/login/verify'),
        hideMessages: true,
    });

    const onSubmit = () =>
        signIn(values.email, values.password).then(user => {
            dispatch(setCognitoUser(user));
        });

    return (
        <Fragment>
            <Typography color="textSecondary" variant="h5">
                Welcome
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
                Please Login to your account.
            </Typography>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    }}
                >
                    <TextField
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to="forgot-password">Forgot Password?</Link>
                    <SubmitButton
                        disabled={
                            !values.email || !values.password || hasErrors
                        }
                        submitting={submitting}
                    >
                        Login
                    </SubmitButton>
                </div>
                <div
                    style={{
                        marginTop: 50,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography color="textSecondary">
                        Don't have an account?&nbsp;
                    </Typography>
                    <Link to="register/profile" color="textPrimary">
                        Register
                    </Link>
                </div>
            </form>
        </Fragment>
    );
};

export default LogIn;
