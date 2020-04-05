import { Auth } from 'aws-amplify';
import get from 'lodash/get';
interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
}

export default class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public userType: string;
    constructor(details: UserDetails) {
        this.firstName = details.firstName;
        this.lastName = details.lastName;
        this.email = details.email;
        this.userType = details.userType;
    }

    get name() {
        return `${this.firstName} ${this.lastName}`;
    }

    isActive() {
        return !!this.email;
    }

    async getCurrentSession() {
        return await Auth.currentSession();
    }

    async getCognitoUser() {
        return await Auth.currentAuthenticatedUser();
    }

    async getRefreshToken() {
        return (await Auth.currentSession()).getRefreshToken().getToken();
    }

    async getAccessToken() {
        return (await Auth.currentSession()).getIdToken().getJwtToken();
    }

    isAdmin() {
        return this.userType === 'admin';
    }
}

export const createUserFromCognitoUser = (user: any) => {
    const attribs = user.attributes
        ? user.attributes
        : {
              given_name: '',
              family_name: '',
              email: '',
          };
    const group = get(
        user,
        'signInUserSession.accessToken.payload.cognito:groups',
        [],
    );
    const newUser = new User({
        firstName: attribs.given_name,
        lastName: attribs.family_name,
        email: attribs.email,
        userType: getUserTypeFromGroup(group),
    });
    return newUser;
};

const getUserTypeFromGroup = (groups: String[]) => {
    const CLINICIAN = 'clinician';
    const ADMIN = 'admin';
    let userType = CLINICIAN;

    groups.forEach(group => {
        if (group.includes('admin')) {
            userType = ADMIN;
        }
    });

    return userType;
};
