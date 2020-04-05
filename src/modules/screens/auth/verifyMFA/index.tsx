import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../redux/store';
import { useForm } from '../../../components/form';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import TextField from '../../../components/ui/Input';
import SubmitButton from '../../../components/ui/SubmitButton';
import { confirmSignIn } from '../../../auth';
import { setCurrentUser } from '../../../redux/actions/session';
import { createUserFromCognitoUser } from '../../../classes/User';
import { Auth } from 'aws-amplify';

const VerifyMFA = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cognitoUser = useSelector(
        (s: ApplicationState) => s.session.cognitoUser,
    );
    const { values, handleChange, ...form } = useForm({
        defaultValues: {
            code: '',
        },
        onSuccess: () => history.push('/dashboard'),
    });

    const onSubmit = () => {
        return confirmSignIn(cognitoUser, values.code).then(async () => {
            const currentAuthentiatedUser = await Auth.currentAuthenticatedUser();
            dispatch(
                setCurrentUser(
                    createUserFromCognitoUser(currentAuthentiatedUser),
                ),
            );
        });
    };

    return (
        <Fragment>
            <Typography color="textSecondary" variant="subtitle1">
                Please enter your verification code.
            </Typography>
            <form
                style={{ width: '100%' }}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    }}
                >
                    <TextField
                        placeholder="Code"
                        name="code"
                        required
                        onChange={handleChange}
                        value={values.code}
                    />
                </div>
                {form.errors.submit && (
                    <Typography color="error">
                        Sorry, we are unable to verify your token. Please try
                        again.
                    </Typography>
                )}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <SubmitButton
                        submitting={form.submitting}
                        disabled={form.hasErrors || !values.code}
                    >
                        Login
                    </SubmitButton>
                </div>
            </form>
        </Fragment>
    );
};

export default VerifyMFA;
