import { Paper, Tab, Tabs, useMediaQuery, useTheme } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { TabPanel } from 'components';
import SwipeableViews from 'react-swipeable-views';
import useStyles from './use-styles';
import { FinesTab, ComplaintsTab } from './Tabs';

enum TabType {
  FINES,
  COMPLAINTS,
}

const UserFinesComplaints = (): ReactElement => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.FINES);

  const theme = useTheme();
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
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
          <Tab label="Otrzymane mandaty" />
          <Tab label="Zgłoszone zażalenia" />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
        className={classes.views}
        resistance
      >
        <TabPanel className={classes.panel} index={TabType.FINES}>
          <FinesTab />
        </TabPanel>
        <TabPanel index={TabType.COMPLAINTS}>
          <ComplaintsTab />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default UserFinesComplaints;
