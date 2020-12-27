import { makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import AppBar from './AppBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  offset: theme.mixins.toolbar,
}));

interface Props {
  children?: ReactElement;
}

export default (props: Props): ReactElement => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar />
      <div className={classes.offset} />
      <div id="app__content" className="h-100">
        {children}
      </div>
    </div>
  );
};
