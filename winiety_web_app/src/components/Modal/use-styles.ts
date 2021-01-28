import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      padding: theme.spacing(1, 2),
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      height: 50,
    },
    closeButton: {
      marginLeft: 'auto',
    },
    title: {
      marginRight: theme.spacing(1),
    },
    content: {
      padding: theme.spacing(2),
    },
  })
);
