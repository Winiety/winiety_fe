import React, { ReactElement, useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { Link, useLocation } from 'react-router-dom';
import routes from 'routes';

interface Props {
  className?: string;
}

const BottomAnalystNavigation = (props: Props): ReactElement => {
  const { className } = props;
  const [value, setValue] = useState(-1);

  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case routes.statistics:
        setValue(0);
        break;
      case routes.statisticsFiles:
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
        to={routes.statistics}
        label="Statystyki"
        icon={<ShowChartIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={routes.statisticsFiles}
        label="Pobieranie"
        icon={<CloudDownload />}
      />
    </BottomNavigation>
  );
};

export default BottomAnalystNavigation;
