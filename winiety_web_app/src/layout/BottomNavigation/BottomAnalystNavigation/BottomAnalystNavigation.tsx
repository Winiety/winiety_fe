import React, { ReactElement, useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
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
      case routes.statisticsFiles:
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
        to={routes.statisticsFiles}
        label="Pobieranie"
        icon={<CloudDownload />}
      />
    </BottomNavigation>
  );
};

export default BottomAnalystNavigation;
