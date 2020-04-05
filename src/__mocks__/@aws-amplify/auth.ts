const auth = {
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
    confirmSignIn: jest.fn(),
    confirmSignUp: jest.fn(),
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
    currentAuthenticatedUser: jest.fn().mockReturnValue({
        getSignInUserSession: jest.fn().mockReturnValue({
            isValid: jest.fn().mockReturnValue(true),
        }),
    }),
    isUserLoggedIn: jest.fn().mockReturnValue(new Promise(r => r(true))),
    currentSession: jest.fn().mockReturnValue(
        new Promise(r =>
            r({
                getIdToken: jest
                    .fn()
                    .mockReturnValue({ getJwtToken: jest.fn() }),
            }),
        ),
    ),
};

export default auth;
