import React, { ReactElement, useEffect } from 'react';
import { RoutedContent } from 'routes';
import { CssBaseline } from '@material-ui/core';
import { useStoreRehydrated } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout';
import { checkSupport, requestNotificationPermission } from 'utils';

const App = (): ReactElement => {
  const isRehydrated = useStoreRehydrated();

  useEffect(() => {
    if (!checkSupport()) return;
    requestNotificationPermission();
  }, []);

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
