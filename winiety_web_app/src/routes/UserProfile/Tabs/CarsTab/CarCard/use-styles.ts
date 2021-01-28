import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    colorBar: {
      maxWidth: 7,
      minWidth: 5,
      flexGrow: 1,
    },
    details: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      flexShrink: 1,
      maxWidth: 115,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    carIcon: {
      padding: theme.spacing(2),
      height: '100%',
      width: '100%',
    },
  })
);
