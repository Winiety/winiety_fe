import { createStyles, makeStyles } from '@material-ui/core';

export default makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    views: {
      flexGrow: 1,
    },
    fullW: { width: '100%' },
  })
);
