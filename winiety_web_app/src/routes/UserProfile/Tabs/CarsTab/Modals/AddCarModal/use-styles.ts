import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    form: {
      maxWidth: 500,
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(1),
      },
    },
    colorPicker: {
      marginTop: theme.spacing(2),
    },
  })
);
