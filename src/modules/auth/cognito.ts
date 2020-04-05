import Amplify from 'aws-amplify';

export const authConfig = {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '',
    //     // OPTIONAL - Cookie path
    //     path: '/',
    //     // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    //     // OPTIONAL - Cookie secure flag
    //     // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true,
    // },

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',
};
Amplify.configure({
    Auth: authConfig,
});
export const configureAuth = () => {
    // console.log ()
    // const currentConfig = Auth.configure(authConfig);
    // console.log("HERE", currentConfig)
    // return currentConfig;
};
