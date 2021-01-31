import React, { ReactElement, useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { QuestionAnswer, Warning } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import routes from 'routes';

interface Props {
  className?: string;
}

const BottomCorrectorNavigation = (props: Props): ReactElement => {
  const { className } = props;
  const [value, setValue] = useState(-1);

  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case routes.complaints:
        setValue(1);
        break;
      case routes.errors:
        setValue(0);
        break;
      default:
        setValue(-1);
    }
  }, [pathname]);

  return (
    <BottomNavigation
      id="bottom__nav"
      style={{ bottom: 0 }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={className}
    >
      <BottomNavigationAction
        component={Link}
        to={routes.errors}
        label="Niezgodności"
        icon={<Warning />}
      />
      <BottomNavigationAction
        component={Link}
        to={routes.complaints}
        label="Zażalenia"
        icon={<QuestionAnswer />}
      />
    </BottomNavigation>
  );
};

export default BottomCorrectorNavigation;
