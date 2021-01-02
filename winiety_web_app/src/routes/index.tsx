import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import UserProfile from './UserProfile/UserProfile';

export const appRoutes = {
  home: '/',
  userProfile: '/profile',
};

export const RoutedContent = (): ReactElement => {
  return (
    <Switch>
      <Route
        path={appRoutes.home}
        exact
        component={() => (
          <>
            {Array.from(Array(100)).map(() => (
              <h1>kek</h1>
            ))}
            <h1>kek last</h1>
          </>
          // <div className="h-100" style={{ backgroundColor: 'white' }} />
        )}
      />
      <Route path={appRoutes.userProfile} exact component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default appRoutes;
