import {
  FormControlLabel,
  Toolbar,
  Typography,
  Switch,
  AppBar,
} from '@material-ui/core';
import { useStoreActions, useStoreState } from 'store';
import React, { ReactElement } from 'react';
import { AuthMenu } from './modules';

import useStyles from './useStyles';

const AppBarComp = (): ReactElement => {
  const classes = useStyles();

  const changeTheme = useStoreActions(
    (actions) => actions.userSettings.changeTheme
  );

  const isDarkTheme = useStoreState((state) => state.userSettings.isDarkTheme);

  const isAuthenticated = useStoreState(
    (state) => state.userSession.isAuthenticated
  );

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WINIETY
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkTheme}
                onChange={handleThemeChange}
                aria-label="dark theme switch"
              />
            }
            label="Dark theme"
          />
          {isAuthenticated && <AuthMenu />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComp;
