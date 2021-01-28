import { Container, CssBaseline } from '@material-ui/core';
import React, { ReactElement } from 'react';

import useStyles from './styles';

const Rides = (): ReactElement => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Twoje przejazdy</h1>
      </div>
    </Container>
  );
};

export default Rides;
