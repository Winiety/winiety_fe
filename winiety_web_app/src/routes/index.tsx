import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute';
import Home from './Home';
import NotFound from './NotFound';
import SigninOidc from './SignInOidc';
import SignoutOidc from './SignOutOidc';
import Rides from './Rides';

const appRoutes = {
  home: '/',
  signIn: '/sign-in',
  signOut: '/sign-out',
  rides: '/rides',
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
      <Route component={NotFound} />
    </Switch>
  );
};

export default appRoutes;
