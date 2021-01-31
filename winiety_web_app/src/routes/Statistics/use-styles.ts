import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    paperTop: {
      margin: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 2),
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      flexGrow: 1,
    },
    selectControl: {
      margin: theme.spacing(2, 1, 1),
      minWidth: 200,
      flexGrow: 1,
    },
    chartContainer: {
      margin: theme.spacing(0, 2, 2),
      padding: theme.spacing(2),
      flexGrow: 1,
    },
  })
);
