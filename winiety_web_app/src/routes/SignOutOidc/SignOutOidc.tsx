import React, { ReactElement, useEffect } from 'react';
import { signOutRedirectCallback } from 'services/userService';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'store';
import routes from 'routes';
import useStyles from './styles';

const SignOutOidc = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const logout = useStoreActions((actions) => actions.userSession.logout);

  useEffect(() => {
    const signoutAsync = async () => {
      await signOutRedirectCallback();
      logout();
      history.push(routes.home);
    };
    signoutAsync();
  }, [history, logout]);

  return (
    <div className={classes.paper}>
      <h1>Ładowanie</h1>
    </div>
  );
};

export default SignOutOidc;
