import { Container, CssBaseline, Button } from '@material-ui/core';
import { apiEndpoints, useAxios } from 'api';
import React, { ReactElement, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'store';
import useStyles from './styles';

const Home = (): ReactElement => {
  const classes = useStyles();
  const login = useStoreActions((actions) => actions.userSession.initiateLogin);

  const isAuthenticated = useStoreState(
    (state) => state.userSession.isAuthenticated
  );

  const axios = useAxios();

  useEffect(() => {
    const method = async () => {
      try {
        const { data } = await axios.get(`${apiEndpoints.profile}/profile`);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    method();
  }, [axios]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src="/images/logo.png"
          alt="Winiety logo"
          className={classes.image}
        />
        <h1>Winiety</h1>
        {!isAuthenticated && (
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
        )}
      </div>
    </Container>
  );
};

export default Home;
