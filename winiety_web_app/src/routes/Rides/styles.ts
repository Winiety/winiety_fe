import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      margin: theme.spacing(5, 0, 0),
    },
    image: {
      marginBottom: theme.spacing(6),
    },
  })
);
