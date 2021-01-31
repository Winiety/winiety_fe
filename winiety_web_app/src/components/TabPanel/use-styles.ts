import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      height: '100%',
      padding: theme.spacing(2),
      width: '100%',
    },
  })
);
