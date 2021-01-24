import { Container, CssBaseline } from '@material-ui/core';
import { apiEndpoints, useAxios } from 'api';
import React, { ReactElement, useEffect } from 'react';
import {
  checkSupport,
  displayNotification,
  getSubscription,
  requestNotificationPermission,
  subscribeUser,
} from 'utils';
import useStyles from './styles';

const Rides = (): ReactElement => {
  const classes = useStyles();
  const axios = useAxios();

  useEffect(() => {
    const registerNotifications = async () => {
      if (!checkSupport()) return;
      if (!requestNotificationPermission()) return;
      displayNotification('WINIETY', 'Witaj w winietach!');

      const sub = await getSubscription();
      if (sub) {
        return;
      }
      const {
        data: { publicKey },
      } = await axios.get(`${apiEndpoints.notification}/`);
      const newSub = await subscribeUser(publicKey);
      if (!newSub) return;
      await axios.post(apiEndpoints.notification, {
        endpoint: newSub.endpoint,
        p256dh: newSub.getKey('p256dh'),
        auth: newSub.getKey('auth'),
      });
    };

    registerNotifications();
  }, [axios]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Twoje przejazdy</h1>
      </div>
    </Container>
  );
};

export default Rides;
