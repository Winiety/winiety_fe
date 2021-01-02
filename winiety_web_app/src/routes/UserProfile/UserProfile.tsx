import { Paper, Tab, Tabs, useMediaQuery, useTheme } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { TabPanel } from 'components';
import SwipeableViews from 'react-swipeable-views';
import useStyles from './use-styles';

enum TabType {
  PROFILE,
  CARS,
}

const UserProfile = (): ReactElement => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.PROFILE);

  const theme = useTheme();
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setActiveTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={matchesSmall ? 'standard' : 'fullWidth'}
          centered
          aria-label="full width tabs example"
        >
          <Tab label="Profil użytkownika" />
          <Tab label="Moje samochody" />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
        className={classes.views}
        resistance
      >
        <TabPanel className={classes.panel} index={TabType.PROFILE}>
          Item One
        </TabPanel>
        <TabPanel index={TabType.CARS}>Item Two</TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default UserProfile;
