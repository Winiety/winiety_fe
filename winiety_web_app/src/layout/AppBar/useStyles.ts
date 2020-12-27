import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      '&:hover': {
        outline: 'none',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    title: {
      flexGrow: 1,
    },
  })
);
