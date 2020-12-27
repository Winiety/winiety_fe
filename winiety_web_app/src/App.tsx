import React, { ReactElement } from 'react';
import { RoutedContent } from 'routes';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { dark } from 'themes';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout';

const App = (): ReactElement => {
  return (
    <MuiThemeProvider theme={dark}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <RoutedContent />
        </Layout>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
