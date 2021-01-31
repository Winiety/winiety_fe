import {
  UserManagerSettings,
  UserManager,
  User,
  SignoutResponse,
} from 'oidc-client';

const authority = process.env.NODE_ENV.includes('development')
  ? `${process.env.REACT_APP_SERVER_ORIGIN}:${process.env.REACT_APP_IDENTITY_PORT}`
  : `${process.env.REACT_APP_IDENTITY_ORIGIN}`;

const userServiceConfig: UserManagerSettings = {
  authority,
  client_id: 'react',
  redirect_uri: `${window.location.origin}/sign-in`,
  silent_redirect_uri: `${window.location.origin}/sign-in`,
  response_type: 'id_token token',
  scope:
    'openid profile ai fines payment pictures rides statistics userprofile notification',
  post_logout_redirect_uri: `${window.location.origin}/sign-out`,
  // metadata: {
  //   jwks_uri: `${authority}/.well-known/openid-configuration/jwks`,
  //   end_session_endpoint: `${authority}/connect/endsession`,
  //   authorization_endpoint: `${authority}/connect/authorize`,
  // },
  // signingKeys: JSON.parse(
  //   '[{"kty": "RSA","use": "sig","kid": "C39FA294EA094F976D25955361B06E9A","e": "AQAB","n":"yDCcEVoKvYi3uiZegFwtTdAdlTvxdbLl2xrYMEemofp7QCADdjSHuJR-0K3bZOSmmsYLIFJQRjXXeI29Z_f1w9jyTqsQrOT_5Bd8kpX50bqqOrQngnNN2AbaxlRCfKZ84MHE2xFIDQLLiE6C61RkuDdpBACwfAWevnYN0-syNNmW0mEiPWGL3oYmgM2Jzi0VO4EfpErCJ1Qsf7rawLDYluYr0DG9sU_rdahr-Itxs3mOwlyPziIHAOpwNgCzD7YIOeD6qaLITwYGMCj8dE0IbGgHac4Vap6Mj6XEigQzizArhFgnucOAONl10FdU9Js7VfL1C2oBg2mI7NhuVYV8Uw","alg": "RS256"}]'
  // ),
};

const userManager = new UserManager(userServiceConfig);

export const signInRedirect = (): Promise<void> => {
  return userManager.signinRedirect();
};

export const signInRedirectCallback = (): Promise<User> => {
  return userManager.signinRedirectCallback();
};

export const signOutRedirect = async (): Promise<void> => {
  const idToken = (await userManager.getUser())?.id_token;
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirect({ id_token_hint: idToken });
};

export const signOutRedirectCallback = (): Promise<SignoutResponse> => {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
};

export default userManager;
