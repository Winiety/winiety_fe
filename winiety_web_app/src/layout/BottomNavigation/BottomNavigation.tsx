import React, { ReactElement, useState } from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import { Restore, Favorite, LocationOn } from '@material-ui/icons';
import classNames from 'classnames';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

interface Props {
  className?: string;
}

const BottomNavigationComp = (props: Props): ReactElement => {
  const { className } = props;
  const [value, setValue] = useState(0);
  const classes = useStyles();
  return (
    <BottomNavigation
      id="bottom__nav"
      style={{ bottom: 0 }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classNames(classes.root, className)}
    >
      <BottomNavigationAction label="Recents" icon={<Restore />} />
      <BottomNavigationAction label="Favorites" icon={<Favorite />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
    </BottomNavigation>
  );
};

export default BottomNavigationComp;
