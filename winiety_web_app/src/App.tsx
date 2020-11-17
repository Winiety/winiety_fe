import React, { ReactElement } from 'react';
import { RoutedContent } from 'routes';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { dark } from 'themes';
import { BrowserRouter } from 'react-router-dom';

const App = (): ReactElement => {
  return (
    <MuiThemeProvider theme={dark}>
      <CssBaseline />
      <BrowserRouter>
        <RoutedContent />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
