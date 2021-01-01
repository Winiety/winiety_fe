import { Container, CssBaseline, Button } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useStoreActions, useStoreState } from 'store';
import useStyles from './styles';

const Home = (): ReactElement => {
  const classes = useStyles();
  const login = useStoreActions((actions) => actions.userSession.initiateLogin);
  const logout = useStoreActions(
    (actions) => actions.userSession.initiateLogout
  );
  const isAuthenticated = useStoreState(
    (state) => state.userSession.isAuthenticated
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Winiety</h1>
        {isAuthenticated ? (
          <div>
            <h1>Witaj zalogowany użytkowniku</h1>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => logout()}
            >
              Wyloguj
            </Button>
          </div>
        ) : (
          <h1>Witaj gościu</h1>
        )}
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => login()}
        >
          Zaloguj
        </Button>
      </div>
    </Container>
  );
};

export default Home;
