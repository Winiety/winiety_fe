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
        try {
          await axios.post(
            `${apiEndpoints.notification}/notification/register`,
            {
              endpoint: sub.endpoint,
              p256dh: new Uint8Array(
                sub.getKey('p256dh') as ArrayBuffer
              ).reduce((data, byte) => data + String.fromCharCode(byte), ''),
              auth: new Uint8Array(sub.getKey('auth') as ArrayBuffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              ),
            }
          );
          return;
        } catch (error) {
          console.log(error);
        }
      }
      const {
        data: { publicKey },
      } = await axios.get(`${apiEndpoints.notification}/notification/key`);
      const newSub = await subscribeUser(publicKey);
      if (!newSub) return;
      await axios.post(`${apiEndpoints.notification}/notification/register`, {
        endpoint: newSub.endpoint,
        p256dh: new Uint8Array(newSub.getKey('p256dh') as ArrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        ),
        auth: new Uint8Array(newSub.getKey('auth') as ArrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        ),
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
