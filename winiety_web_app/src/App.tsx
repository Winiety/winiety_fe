import React, { ReactElement } from 'react';
import { RoutedContent } from 'routes';
import { CssBaseline } from '@material-ui/core';
import { useStoreRehydrated } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout';

const App = (): ReactElement => {
  const isRehydrated = useStoreRehydrated();
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
