import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@material-ui/core';

export default responsiveFontSizes(
  createMuiTheme({
    direction: 'ltr',
    palette: {
      type: 'light',
    },
  } as ThemeOptions)
);
