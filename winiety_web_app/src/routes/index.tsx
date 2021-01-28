import React, { ReactElement, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute';
import {
  arrayBufferToBase64,
  displayNotification,
  getSubscription,
  subscribeUser,
} from 'utils';
import { useStoreState } from 'store';
import { NotificationRepository } from 'api/repository';
import Home from './Home';
import NotFound from './NotFound';
import SigninOidc from './SignInOidc';
import SignoutOidc from './SignOutOidc';
import Rides from './Rides';

const appRoutes = {
  home: '/',
  signIn: '/sign-in',
  signOut: '/sign-out',
  rides: '/rides',
};

const onError = () =>
  displayNotification('Błąd', 'Wystąpił błąd podczas łączeniem z serwerem');

export const RoutedContent = (): ReactElement => {
  const isAuthenticated = useStoreState(
    (state) => state.userSession.isAuthenticated
  );

  const getKey = NotificationRepository.useGetKeyLazy();
  const postSubscription = NotificationRepository.usePostNotificationSubscription(
    onError
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    const inner = async () => {
      let sub: PushSubscription | null | undefined = await getSubscription();
      if (!sub) {
        const key = await getKey();
        if (!key) {
          onError();
          return;
        }
        sub = await subscribeUser(key);
      }
      if (!sub) {
        displayNotification(
          'Błąd',
          'Wystąpił błąd podczas subskrypcji notyfikacji. Spróbuj przeładować stronę'
        );
        return;
      }
      await postSubscription({
        endpoint: sub.endpoint,
        p256dh: arrayBufferToBase64(sub.getKey('p256dh')),
        auth: arrayBufferToBase64(sub.getKey('auth')),
      });
    };
    inner();
  }, [getKey, isAuthenticated, postSubscription]);

  return (
    <Switch>
      <Route path={appRoutes.signIn} component={SigninOidc} />
      <Route path={appRoutes.signOut} component={SignoutOidc} />
      <Route path={appRoutes.home} exact component={Home} />
      <AuthRoute
        path={appRoutes.rides}
        Component={Rides}
        requiredRoles={['user']}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default appRoutes;
