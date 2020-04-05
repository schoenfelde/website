import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import {
    useForm,
    emailValidator,
    passwordValidator,
} from '../../../components/form';
import TextField from '../../../components/ui/Input';
import SubmitButton from '../../../components/ui/SubmitButton';
import { forgotPasswordSubmit } from '../../../auth';

const ResetPassword = () => {
    const history = useHistory();
    const { state } = useLocation();
    const initialEmailAddress = (state || ({} as any)).email;
    const {
        values,
        handleChange,
        handleSubmit,
        submitting,
        errors,
        hasErrors,
    } = useForm({
        defaultValues: {
            email: initialEmailAddress,
            password: '',
            confirmPassword: '',
        },
        validations: {
            email: emailValidator,
            password: [
                passwordValidator,
                {
                    message: 'Passwords must match.',
                    validate: (p, allValues) => p === allValues.confirmPassword,
                },
            ],
        },
        onSuccess: () => history.push('/'),
    });

    const onSubmit = () =>
        forgotPasswordSubmit(values.email, values.token, values.password);
    return (
        <Fragment>
            <Typography
                style={{ textAlign: 'center' }}
                color="textSecondary"
                variant="h6"
            >
                Reset Password
            </Typography>
            <Typography
                color="textSecondary"
                variant="subtitle1"
                style={{ textAlign: 'center' }}
            >
                Enter the code you received in your email as well as your new
                password.
            </Typography>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    name="email"
                    placeholder="Email"
                    required
                    error={!!errors.email}
                    value={values.email}
                    helperText={errors.email}
                    onChange={handleChange}
                />
                <TextField
                    name="token"
                    placeholder="Code"
                    required
                    error={!!errors.token}
                    value={values.token}
                    helperText={errors.token}
                    onChange={handleChange}
                />
                <TextField
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    error={!!errors.password}
                    value={values.password}
                    helperText={errors.password}
                    onChange={handleChange}
                />
                <TextField
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    required
                    error={!!errors.confirmPassword}
                    value={values.confirmPassword}
                    helperText={errors.confirmPassword}
                    onChange={handleChange}
                />
                {errors.submit && (
                    <Typography color="error">
                        Sorry, we are unable to reset your password at this
                        time.
                    </Typography>
                )}
                <div style={{ alignSelf: 'center' }}>
                    <SubmitButton
                        style={{ marginTop: 10 }}
                        disabled={
                            !values.email ||
                            !values.token ||
                            !values.password ||
                            hasErrors
                        }
                        submitting={submitting}
                    >
                        Reset
                    </SubmitButton>
                </div>
            </form>
        </Fragment>
    );
};

export default ResetPassword;
