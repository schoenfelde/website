import { Auth } from 'aws-amplify';

export const signIn = (username: string, password: string) =>
    Auth.signIn({ username, password });
export const signOut = () => Auth.signOut();
export const signUp = (signUpParams: {
    username: string;
    password: string;
    attributes?: any;
}) => Auth.signUp(signUpParams);
export const confirmSignIn = (user: any, code: string) =>
    Auth.confirmSignIn(user, code);
export const confirmSignUp = (username: string, code: string) =>
    Auth.confirmSignUp(username, code);
export const forgotPassword = (username: string) =>
    Auth.forgotPassword(username);
export const forgotPasswordSubmit = (
    username: string,
    token: string,
    password: string,
) => Auth.forgotPasswordSubmit(username, token, password);
export const completeNewPassword = (
    user: any,
    password: string,
    attributes: any,
) => Auth.completeNewPassword(user, password, attributes);
export const isUserLoggedIn = async (): Promise<boolean> => {
    try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        if (!cognitoUser) return false;
        const currentSession = cognitoUser.getSignInUserSession();
        return currentSession.isValid();
    } catch (e) {
        console.error(e);
        return false;
    }
};
export const getAuthenticatedUser = () => Auth.currentAuthenticatedUser();
