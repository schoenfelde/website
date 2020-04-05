import React, { Fragment, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm, emailValidator } from '../../../../components/form';
import TextField from '../../../../components/ui/Input';
import SubmitButton from '../../../../components/ui/SubmitButton';
import { signUp, confirmSignUp } from '../../../../auth';

const SetUpProfile = () => {
    const history = useHistory();
    const [isConfirming, setConfirming] = useState(false);
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
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
        },
        validations: {
            email: emailValidator,
        },
        errorReducer: apiError => {
            if (apiError.message === 'Invalid phone number format.')
                return {
                    phoneNumber: 'Invalid phone number format.',
                    submit: '',
                };
            else
                return {
                    submit:
                        'Sorry, we are unable start registration at this time.',
                    phoneNumber: '',
                };
        },
        onSuccess: () => isConfirming && history.push('/login'),
    });

    //TODO find API here
    const onSubmit = () => {
        const {
            password,
            email,
            firstName,
            lastName,
            phoneNumber,
            confirmationCode,
        } = values;
        if (confirmationCode) {
            return confirmSignUp(email, confirmationCode);
        } else {
            return signUp({
                password,
                username: values.email,
                attributes: {
                    email,
                    given_name: firstName,
                    family_name: lastName,
                    phone_number: phoneNumber,
                },
            }).then(() => setConfirming(true));
        }
    };
    return (
        <Fragment>
            <Typography
                style={{ textAlign: 'center' }}
                color="textPrimary"
                variant="h6"
            >
                Welcome to Website
            </Typography>
            <Typography
                style={{ textAlign: 'center' }}
                color="textSecondary"
                variant="subtitle1"
            >
                Please enter your information.
            </Typography>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                {!isConfirming ? (
                    <Fragment>
                        <div style={{ display: 'flex' }}>
                            <div
                                style={{
                                    flex: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <TextField
                                    name="firstName"
                                    placeholder="First Name"
                                    required
                                    error={!!errors.firstName}
                                    value={values.firstName}
                                    helperText={errors.firstName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name="lastName"
                                    placeholder="Last Name"
                                    required
                                    error={!!errors.lastName}
                                    value={values.lastName}
                                    helperText={errors.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
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
                            name="phoneNumber"
                            placeholder="Phone Number"
                            required
                            error={!!errors.phoneNumber}
                            value={values.phoneNumber}
                            helperText={errors.phoneNumber}
                            onChange={handleChange}
                        />
                        <Typography
                            style={{ width: '100%', textAlign: 'center' }}
                            color="textPrimary"
                            variant="subtitle1"
                        >
                            Select Your Password
                        </Typography>
                        <TextField
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            error={!!errors.password}
                            value={values.password}
                            helperText={errors.password}
                            onChange={handleChange}
                        />
                        <TextField
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            error={!!errors.confirmPassword}
                            value={values.confirmPassword}
                            helperText={errors.confirmPassword}
                            onChange={handleChange}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typography
                            style={{ width: '100%', textAlign: 'center' }}
                            color="textPrimary"
                            variant="subtitle1"
                        >
                            Enter the Confirmation Code
                        </Typography>
                        <TextField
                            name="confirmationCode"
                            placeholder="Confirmation Code"
                            error={!!errors.confirmationCode}
                            value={values.confirmationCode}
                            helperText={errors.confirmationCode}
                            onChange={handleChange}
                        />
                    </Fragment>
                )}
                {errors.submit && (
                    <Typography color="error">
                        Sorry, we are unable start registration at this time.
                    </Typography>
                )}
                <div style={{ alignSelf: 'center' }}>
                    <SubmitButton
                        style={{ marginTop: 10 }}
                        disabled={!values.email || hasErrors}
                        submitting={submitting}
                    >
                        Save
                    </SubmitButton>
                </div>
            </form>
        </Fragment>
    );
};

export default SetUpProfile;
