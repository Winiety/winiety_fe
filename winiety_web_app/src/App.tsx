import React, { ReactElement, useEffect } from 'react';
import { RoutedContent } from 'routes';
import { CssBaseline } from '@material-ui/core';
import { useStoreRehydrated } from 'easy-peasy';
import { BrowserRouter, useHistory } from 'react-router-dom';
import Layout from 'layout';
import { checkSupport, requestNotificationPermission } from 'utils';
import ReactGA from 'react-ga';

const trackingId = 'UA-189221892-1';
ReactGA.initialize(trackingId, {
  debug: true,
});
ReactGA.set({ cd1: 'online' });

const App = (): ReactElement => {
  const isRehydrated = useStoreRehydrated();
  const history = useHistory();

  useEffect(() => {
    if (!checkSupport()) return;
    requestNotificationPermission();
  }, []);

  history.listen(({ location }) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return (
    <>
      <BrowserRouter>
        <Layout>
          <>
            <CssBaseline />
            {isRehydrated ? <RoutedContent /> : <div>Ładowanie...</div>}
          </>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
