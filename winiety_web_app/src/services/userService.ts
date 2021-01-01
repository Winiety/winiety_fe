import {
  UserManagerSettings,
  UserManager,
  User,
  SignoutResponse,
} from 'oidc-client';

const userServiceConfig: UserManagerSettings = {
  authority: 'https://localhost:5101',
  client_id: 'react',
  redirect_uri: 'http://localhost:3000/sign-in',
  response_type: 'id_token token',
  scope:
    'openid profile ai fines payment pictures rides statistics userprofile notification',
  post_logout_redirect_uri: 'http://localhost:3000/sign-out',
};

const userManager = new UserManager(userServiceConfig);

export const signInRedirect = (): Promise<void> => {
  return userManager.signinRedirect();
};

export const signInRedirectCallback = (): Promise<User> => {
  return userManager.signinRedirectCallback();
};

export const signOutRedirect = (): Promise<void> => {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirect();
};

export const signOutRedirectCallback = (): Promise<SignoutResponse> => {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
};

export default userManager;
