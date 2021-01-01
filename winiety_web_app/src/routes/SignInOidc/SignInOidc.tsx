import { Container, CssBaseline } from '@material-ui/core';
import React, { useEffect, ReactElement } from 'react';
import { signInRedirectCallback } from 'services/userService';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'store';
import routes from 'routes';
import useStyles from './styles';

const SignInOidc = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const setSession = useStoreActions(
    (actions) => actions.userSession.setSession
  );

  useEffect(() => {
    const signinAsync = async () => {
      const user = await signInRedirectCallback();
      setSession(user);
      history.push(routes.home);
    };
    signinAsync();
  }, [history, setSession]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Ładowanie</h1>
      </div>
    </Container>
  );
};

export default SignInOidc;
