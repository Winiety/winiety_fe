import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { ReactElement } from 'react';
import { useStoreActions } from 'store';
import { useHistory } from 'react-router-dom';
import appRoutes from 'routes';

const AuthMenu = (): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const logout = useStoreActions(
    (actions) => actions.userSession.initiateLogout
  );

  const history = useHistory();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    history.push(appRoutes.userProfile);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profil</MenuItem>
        <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
      </Menu>
    </div>
  );
};

export default AuthMenu;
