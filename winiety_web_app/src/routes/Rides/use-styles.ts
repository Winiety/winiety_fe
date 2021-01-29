import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    table: {
      minWidth: 650,
    },
    textField: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      width: 250,
    },
  })
);
