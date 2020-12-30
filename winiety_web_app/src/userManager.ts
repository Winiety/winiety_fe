import { UserManagerSettings, UserManager } from 'oidc-client';

const UserManagerConfig: UserManagerSettings = {
  authority: 'https://localhost:5101',
  client_id: 'react',
  redirect_uri: 'http://localhost:3000/home',
  response_type: 'id_token token',
  scope:
    'openid profile ai fines payment pictures rides statistics userprofile notification',
  post_logout_redirect_uri: 'http://localhost:3000/logout',
};

const userManager = new UserManager(UserManagerConfig);

export default userManager;
