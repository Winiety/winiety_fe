import { action, Action } from 'easy-peasy';
import { signInRedirect, signOutRedirect } from 'services/userService';
import setAuthHeader from 'utils/axiosHeader';

export interface UserSessionModel {
  isAuthenticated: boolean;
  accessToken: string;
  role: string;
  initiateLogin: Action<UserSessionModel>;
  initiateLogout: Action<UserSessionModel>;
  login: Action<UserSessionModel, string>;
  logout: Action<UserSessionModel>;
}

const userSessionModel: UserSessionModel = {
  isAuthenticated: false,
  accessToken: '',
  role: 'guest',
  initiateLogin: action(() => {
    signInRedirect();
  }),
  initiateLogout: action(() => {
    signOutRedirect();
  }),
  login: action((state, accessToken) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthenticated = true;
    // eslint-disable-next-line no-param-reassign
    state.accessToken = accessToken;
    /* TODO Roles assignment */
    // eslint-disable-next-line no-param-reassign
    state.role = 'user';
    setAuthHeader(accessToken);
  }),
  logout: action((state) => {
    // eslint-disable-next-line no-param-reassign
    state.isAuthenticated = false;
    // eslint-disable-next-line no-param-reassign
    state.accessToken = '';
    // eslint-disable-next-line no-param-reassign
    state.role = 'guest';
  }),
};

export default userSessionModel;
