import React, { ReactElement } from 'react';
import { Modal } from 'components';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Fine } from 'api/types';
import { FineRepository } from 'api/repository';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from './use-styles';

interface AddFineModalProps {
  rideId: number;
  open: boolean;
  handleClose: () => void;
}

type FineFormValues = Omit<Fine, 'rideId'>;

const formSchema: yup.SchemaOf<FineFormValues> = yup.object().shape({
  cost: yup
    .number()
    .positive('Wymagana liczba dodatnia')
    .required('Wymagana wysokość mandatu'),
  description: yup.string().required('Wymagany opis mandatu'),
});

const AddFineModal = (props: AddFineModalProps): ReactElement => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [postData] = FineRepository.usePostFine();

  const { handleSubmit, register, errors } = useForm<FineFormValues>({
    resolver: yupResolver(formSchema),
    shouldFocusError: true,
  });

  const handleFinePost = (formData: Fine) => {
    // eslint-disable-next-line no-param-reassign
    formData.rideId = props.rideId;
    postData(formData);
    handleClose();
  };

  return (
    <Modal title="Wystaw mandat" open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleFinePost)} className={classes.form}>
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
