import React, { ReactElement } from 'react';
import { Modal } from 'components';
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Complaint, Fine } from 'api/types';
import { ComplaintRepository } from 'api/repository';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from './use-styles';

interface AddComplaintModalProps {
  rideId: number;
  open: boolean;
  handleClose: () => void;
}

type ComplaintFormValues = Omit<Complaint, 'rideId'>;

const formSchema: yup.SchemaOf<ComplaintFormValues> = yup.object().shape({
  description: yup.string().required('Wymagana treść zażalenia'),
});

const AddComplaintModal = (props: AddComplaintModalProps): ReactElement => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [postData] = ComplaintRepository.usePostComplaint();

  const { handleSubmit, register, errors } = useForm<ComplaintFormValues>({
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
    <Modal title="Zgłoś zażalenie" open={open} onClose={handleClose}>
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
          label="Treść zażalenia"
        />
        <Button color="primary" variant="contained" type="submit" fullWidth>
          Zapisz
        </Button>
      </form>
    </Modal>
  );
};

export default AddComplaintModal;
