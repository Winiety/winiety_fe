import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(25),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
);
