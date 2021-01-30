import React, { ReactElement } from 'react';
import { Modal } from 'components';
import { Button } from '@material-ui/core';
import useStyles from './use-styles';

interface AreYouSureDeleteCarModalProps {
  open: boolean;
  brand: string;
  model: string;
  handleClose: () => void;
  onConfirm: () => void;
}

const AreYouSureDeleteCarModal = (
  props: AreYouSureDeleteCarModalProps
): ReactElement => {
  const { brand, handleClose, model, onConfirm, open } = props;
  const classes = useStyles();
  return (
    <Modal
      title={`Czy na pewno chcesz usunąć samochód ${brand} ${model}?`}
      onClose={handleClose}
      open={open}
    >
      <div>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onConfirm}
        >
          Usuń samochód
        </Button>
        <Button
          fullWidth
          variant="contained"
          className={classes.cancelButton}
          color="primary"
          onClick={handleClose}
        >
          Anuluj
        </Button>
      </div>
    </Modal>
  );
};

export default AreYouSureDeleteCarModal;
