import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute';
import Home from './Home';
import NotFound from './NotFound';
import SigninOidc from './SignInOidc';
import SignoutOidc from './SignOutOidc';
import Rides from './Rides';
import Fines from './Fines';
import Offenses from './Offenses';
import UserProfile from './UserProfile/UserProfile';

export const appRoutes = {
  home: '/',
  signIn: '/sign-in',
  signOut: '/sign-out',
  rides: '/rides',
  fines: '/fines',
  offenses: '/offenses',
  userProfile: '/profile',
};

export const RoutedContent = (): ReactElement => {
  return (
    <Switch>
      <Route path={appRoutes.signIn} component={SigninOidc} />
      <Route path={appRoutes.signOut} component={SignoutOidc} />
      <Route path={appRoutes.home} exact component={Home} />
      <AuthRoute
        path={appRoutes.rides}
        Component={Rides}
        requiredRoles={['user']}
      />
      <AuthRoute
        path={appRoutes.fines}
        Component={Fines}
        requiredRoles={['police']}
      />
      <AuthRoute
        path={appRoutes.offenses}
        Component={Offenses}
        requiredRoles={['police']}
      />
      <AuthRoute
        path={appRoutes.userProfile}
        Component={UserProfile}
        requiredRoles={['user']}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default appRoutes;
