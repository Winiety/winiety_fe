import React, { ReactElement } from 'react';
import { Modal } from 'components';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { UserFine } from 'routes/Fines/generators/fine-generator';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from './use-styles';

interface CreateFine {
  rideId: number;
  cost: number;
  description: string;
}

interface AddFineModalProps {
  open: boolean;
  handleClose: () => void;
}

type FineFormValues = CreateFine;

const formSchema: yup.SchemaOf<FineFormValues> = yup.object().shape({
  description: yup.string().required('Opis mandatu'),
  cost: yup.number().required('Wysokość mandatu'),
  rideId: yup.number().required('Data wystawienia'),
});

const AddFineModal = (props: AddFineModalProps): ReactElement => {
  const { open, handleClose } = props;
  const classes = useStyles();

  const { handleSubmit, register, errors } = useForm<FineFormValues>({
    resolver: yupResolver(formSchema),
    shouldFocusError: true,
  });

  return (
    <Modal title="Wystaw mandat" open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(console.log)} className={classes.form}>
        <TextField
          error={!!errors.description}
          helperText={errors.description?.message}
          inputRef={register}
          multiline
          rows={4}
          fullWidth
          variant="filled"
          name="description"
          label="Opis mandatu"
        />
        <TextField
          error={!!errors.cost}
          helperText={errors.cost?.message}
          inputRef={register}
          type="number"
          fullWidth
          name="cost"
          label="Wysokość mandatu"
          InputProps={{
            endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
          }}
        />
        <Button color="primary" variant="contained" type="submit" fullWidth>
          Zapisz
        </Button>
      </form>
    </Modal>
  );
};

export default AddFineModal;
