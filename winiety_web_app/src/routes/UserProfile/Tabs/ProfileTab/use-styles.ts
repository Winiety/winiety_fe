import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        '& .MuiTextField-root': {
          margin: theme.spacing(2, 0),
        },
      },
      [theme.breakpoints.down('sm')]: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1, 0),
        },
      },
    },
    buttonsContainer: {
      display: 'flex',
    },
    button: {
      marginLeft: 'auto',
    },
  })
);
