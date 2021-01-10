import React, { ReactElement } from 'react';
import { Modal } from 'components';
import { Button, TextField } from '@material-ui/core';
import useStyles from './use-styles';

interface AddCarModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddCarModal = (props: AddCarModalProps): ReactElement => {
  const { open, handleClose } = props;
  const classes = useStyles();

  return (
    <Modal title="Dodaj samochód" open={open} onClose={handleClose}>
      <form className={classes.form}>
        <TextField fullWidth name="plateNumber" label="Tablica rejestracyjna" />
        <TextField fullWidth name="brand" label="Marka" />
        <TextField fullWidth name="model" label="Model" />
        {/* TODO: Make a select */}
        <TextField fullWidth name="color" label="Kolor" />
        <TextField fullWidth name="year" label="Rok" />
        <Button color="primary" variant="contained" type="submit" fullWidth>
          Zapisz
        </Button>
      </form>
    </Modal>
  );
};

export default AddCarModal;
