import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import useStyles from './styles';

const NotFound = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.backHomeText}>
        <Link to={routes.home}>Go to Home</Link>
      </Typography>
    </div>
  );
};

export default NotFound;
