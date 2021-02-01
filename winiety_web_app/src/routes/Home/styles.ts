import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    paper: {
      textAlign: 'center',
    },
    button: {
      margin: theme.spacing(5, 0, 0),
    },
    image: {
      marginBottom: theme.spacing(6),
      width: 200,
    },
  })
);
