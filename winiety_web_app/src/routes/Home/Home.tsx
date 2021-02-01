import { Button, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useStoreActions, useStoreState } from 'store';
import useStyles from './styles';

const Home = (): ReactElement => {
  const classes = useStyles();
  const login = useStoreActions((actions) => actions.userSession.initiateLogin);

  const isAuthenticated = useStoreState(
    (state) => state.userSession.isAuthenticated
  );

  return (
    <div className={classes.container}>
      <div className={classes.paper}>
        <img
          src="/images/logo.png"
          alt="Winiety logo"
          className={classes.image}
        />
        <Typography variant="h1">Winiety</Typography>
        <Typography variant="h5">
          Portal elektronicznego zakupu winiet autostradowych
        </Typography>
        {!isAuthenticated && (
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => login()}
          >
            Zaloguj
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
