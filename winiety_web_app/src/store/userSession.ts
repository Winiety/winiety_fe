import { action, Action } from 'easy-peasy';
import { User } from 'oidc-client';
import { signInRedirect, signOutRedirect } from 'services/userService';
import setAuthHeader from 'utils/axiosHeader';

export interface UserSessionModel {
  isAuthenticated: boolean;
  accessToken: string;
  initiateLogin: Action<UserSessionModel>;
  initiateLogout: Action<UserSessionModel>;
  setSession: Action<UserSessionModel, User>;
  logout: Action<UserSessionModel>;
}

const userSessionModel: UserSessionModel = {
  isAuthenticated: false,
  accessToken: '',
  initiateLogin: action(() => {
    signInRedirect();
  }),
  initiateLogout: action(() => {
    signOutRedirect();
  }),
  setSession: action((state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthenticated = true;
    // eslint-disable-next-line no-param-reassign
    state.accessToken = payload.access_token;
    setAuthHeader(payload.access_token);
  }),
  logout: action((state) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthenticated = false;
    // eslint-disable-next-line no-param-reassign
    state.accessToken = '';
  }),
};

export default userSessionModel;
