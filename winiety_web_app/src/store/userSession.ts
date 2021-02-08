import { action, Action } from 'easy-peasy';
import { signInRedirect, signOutRedirect } from 'services/userService';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { displayNotification } from 'utils';
import ReactGA from 'react-ga';

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

interface CustomJwtPayload extends JwtPayload {
  role?: string[] | string;
  uniqueName: string;
}

const userSessionModel: UserSessionModel = {
  isAuthenticated: false,
  accessToken: null,
  role: [],
  loggedIn: action((state) => {
    if (state.accessToken) {
      const token = jwtDecode<CustomJwtPayload>(state.accessToken);
      if (token?.exp) {
        if (token?.exp < Date.now() / 1000) {
          // eslint-disable-next-line no-param-reassign
          state.isAuthenticated = false;
          // eslint-disable-next-line no-param-reassign
          state.accessToken = null;
          // eslint-disable-next-line no-param-reassign
          state.role = [];
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
    const userData = jwtDecode<CustomJwtPayload>(token);
    if (userData?.role) {
      // eslint-disable-next-line no-param-reassign
      state.role = [userData.role].flat();
    }
    ReactGA.set({
      userId: userData.uniqueName,
    });
    displayNotification('WINIETY', 'Witaj w winietach!');
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
