import React, { ReactElement, useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  DriveEta,
  Payment,
  QuestionAnswer,
  Vignette,
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import routes from 'routes';

interface Props {
  className?: string;
}

const BottomUserNavigation = (props: Props): ReactElement => {
  const { className } = props;
  const [value, setValue] = useState(-1);

  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case routes.rides:
        setValue(0);
        break;
      case routes.userFinesComplaints:
        setValue(2);
        break;
      case routes.UserPayments:
        setValue(3);
        break;
      case routes.UserVignettes:
        setValue(1);
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
        to={routes.rides}
        label="Przejazdy"
        icon={<DriveEta />}
      />
      <BottomNavigationAction
        component={Link}
        to={routes.UserVignettes}
        label="Winiety"
        icon={<Vignette />}
      />
      <BottomNavigationAction
        component={Link}
        to={routes.userFinesComplaints}
        label="Mandaty/zażalenia"
        icon={<QuestionAnswer />}
      />
      <BottomNavigationAction
        component={Link}
        to={routes.UserPayments}
        label="Płatności"
        icon={<Payment />}
      />
    </BottomNavigation>
  );
};

export default BottomUserNavigation;
