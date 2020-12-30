import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import userManager from '../userManager';

const appRoutes = {
  home: '/',
};

export const RoutedContent = (): ReactElement => {
  userManager.signinRedirect();

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
      <Route component={NotFound} />
    </Switch>
  );
};

export default appRoutes;
