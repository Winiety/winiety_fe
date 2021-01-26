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

const arrayBufferToBase64 = (buffer: ArrayBuffer | null) => {
  if (!buffer) return '';
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

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
              p256dh: arrayBufferToBase64(sub.getKey('p256dh')),
              auth: arrayBufferToBase64(sub.getKey('auth')),
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
        p256dh: arrayBufferToBase64(newSub.getKey('p256dh')),
        auth: arrayBufferToBase64(newSub.getKey('auth')),
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
