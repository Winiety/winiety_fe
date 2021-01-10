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
  const login = useStoreActions((actions) => actions.userSession.login);

  useEffect(() => {
    const signInAsync = async () => {
      const accessToken = (await signInRedirectCallback())?.access_token;
      if (accessToken !== '') {
        login(accessToken);
      }
      history.push(routes.rides);
    };
    signInAsync();
  }, [history, login]);

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
