import {
  FormGroup,
  FormControlLabel,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  AppBar,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React, { ReactElement } from 'react';
import { AuthMenu } from './modules';

import useStyles from './useStyles';

const AppBarComp = (): ReactElement => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* TODO: ONLY DEMO, DELETE! */}
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            WINIETY
          </Typography>
          {auth && <AuthMenu />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComp;
