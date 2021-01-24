import {
  FormControlLabel,
  Toolbar,
  Typography,
  Switch,
  AppBar,
} from '@material-ui/core';
import { useStoreActions, useStoreState } from 'store';
import React, { ReactElement } from 'react';
import routes from 'routes';
import { useHistory } from 'react-router-dom';
import { AuthMenu } from './modules';

import useStyles from './useStyles';

const AppBarComp = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

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

  const handleHomeRedirect = () => {
    history.push(routes.home);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <img
            className={classes.logo}
            src="/images/logo.png"
            alt="Winiety logo"
            onClick={handleHomeRedirect}
            role="presentation"
          />
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
