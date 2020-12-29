import React, { ReactElement } from 'react';
import { RoutedContent } from 'routes';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout';

const App = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <>
            <CssBaseline />
            <RoutedContent />
          </>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
