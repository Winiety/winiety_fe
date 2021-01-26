import React from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'store';
import routes from 'routes';

interface Props {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  requiredRoles: string[];
}

const AuthRoute = ({
  Component,
  path,
  exact = false,
  requiredRoles,
}: Props): JSX.Element => {
  const isAuthenticated = useStoreState(
    (state) => state.userSession.isAuthenticated
  );
  const loggedIn = useStoreActions((actions) => actions.userSession.loggedIn);
  loggedIn();

  const roles = useStoreState((state) => state.userSession.role);
  const userHasRequiredRole = roles.some((role) =>
    requiredRoles.includes(role)
  );

  const message = userHasRequiredRole
    ? 'Please log in to view this page'
    : "You can't be here!";
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        isAuthenticated && userHasRequiredRole ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.home,
              state: {
                message,
                requestedPath: path,
              },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
