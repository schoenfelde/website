import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm, emailValidator } from '../../../components/form';
import TextField from '../../../components/ui/Input';
import SubmitButton from '../../../components/ui/SubmitButton';
import { forgotPassword } from '../../../auth';

const ForgotPassword = () => {
    const history = useHistory();
    const {
        values,
        handleChange,
        handleSubmit,
        submitting,
        errors,
        hasErrors,
    } = useForm({
        defaultValues: {
            email: '',
        },
        validations: {
            email: emailValidator,
        },
        onSuccess: () =>
            history.push('/reset-password', { email: values.email }),
    });
    const onSubmit = () => forgotPassword(values.email);
    return (
        <Fragment>
            <Typography
                style={{ textAlign: 'center' }}
                color="textSecondary"
                variant="h6"
            >
                Forgot Password?
            </Typography>
            <Typography
                color="textSecondary"
                variant="subtitle1"
                style={{ textAlign: 'center' }}
            >
                Enter your registered email address to receive a password reset.
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
                    error={!!errors.email}
                    value={values.email}
                    helperText={errors.email}
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
                        disabled={!values.email || hasErrors}
                        submitting={submitting}
                    >
                        Send
                    </SubmitButton>
                </div>
            </form>
        </Fragment>
    );
};

export default ForgotPassword;
