import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      maxWidth: 500,
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(1),
      },
    },
    button: {
      marginLeft: 'auto',
      marginTop: theme.spacing(2),
    },
    buttonsContainer: {
      display: 'flex',
    },
    selectLabel: {
      marginTop: theme.spacing(2),
    },
  })
);
