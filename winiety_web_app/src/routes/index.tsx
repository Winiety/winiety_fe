import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import SigninOidc from './SignInOidc';
import SignoutOidc from './SignOutOidc';

const appRoutes = {
  home: '/',
  signIn: '/sign-in',
  signOut: '/sign-out',
};

export const RoutedContent = (): ReactElement => {
  return (
    <Switch>
      <Route path={appRoutes.signIn} component={SigninOidc} />
      <Route path={appRoutes.signOut} component={SignoutOidc} />
      <Route path={appRoutes.home} exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default appRoutes;
