import { action, Action } from 'easy-peasy';
import { signInRedirect, signOutRedirect } from 'services/userService';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export interface UserSessionModel {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: string[];
  loggedIn: Action<UserSessionModel>;
  initiateLogin: Action<UserSessionModel>;
  initiateLogout: Action<UserSessionModel>;
  login: Action<UserSessionModel, string>;
  logout: Action<UserSessionModel>;
}

const userSessionModel: UserSessionModel = {
  isAuthenticated: false,
  accessToken: null,
  role: [],
  loggedIn: action((state) => {
    if (state.accessToken) {
      const token = jwtDecode<JwtPayload>(state.accessToken);
      console.log(token);
      if (token?.exp) {
        if (token?.exp < Date.now() / 1000) {
          // eslint-disable-next-line no-param-reassign
          state.isAuthenticated = true;
        } else {
          // eslint-disable-next-line no-param-reassign
          state.isAuthenticated = false;
        }
      }
    }
  }),
  initiateLogin: action(() => {
    signInRedirect();
  }),
  initiateLogout: action(() => {
    signOutRedirect();
  }),
  login: action((state, token) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthenticated = true;
    // eslint-disable-next-line no-param-reassign
    state.accessToken = token;
    const userData = jwtDecode<JwtPayload>(token);
    const jToken = JSON.parse(JSON.stringify(userData));
    // eslint-disable-next-line no-param-reassign
    state.role = [jToken.role].flat();
  }),
  logout: action((state) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthenticated = false;
    // eslint-disable-next-line no-param-reassign
    state.accessToken = null;
    // eslint-disable-next-line no-param-reassign
    state.role = [];
  }),
};

export default userSessionModel;
