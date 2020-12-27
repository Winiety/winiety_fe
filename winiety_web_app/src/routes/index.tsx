import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';

const appRoutes = {
  home: '/',
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
          </>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default appRoutes;
