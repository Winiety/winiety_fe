import React, { ReactElement } from 'react';
import { Modal } from 'components';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { PostPicture } from 'api/types';
import { PictureRepository } from 'api/repository';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from './use-styles';

interface AddPictureAnalysisModalProps {
  pictureId: number;
  open: boolean;
  handleClose: () => void;
}

type PictureFormValues = Omit<PostPicture, 'pictureId'>;

const formSchema: yup.SchemaOf<PictureFormValues> = yup.object().shape({
  isRecognized: yup.boolean().default(false),
  plateNumber: yup.mixed().when('isRecognized', {
    is: true,
    then: yup.string().required('Wymagany opis mandatu'),
    otherwise: yup.string().notRequired(),
  }),
});

const AddPictureAnalysis = (
  props: AddPictureAnalysisModalProps
): ReactElement => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [postData] = PictureRepository.usePostPictureAnalysis();

  const { handleSubmit, register, errors, watch, control } = useForm<
    PictureFormValues
  >({
    resolver: yupResolver(formSchema),
    shouldFocusError: true,
  });

  const handlePictureAnalysisPost = (formData: PostPicture) => {
    // eslint-disable-next-line no-param-reassign
    formData.pictureId = props.pictureId;
    postData(formData);

    handleClose();
  };

  return (
    <Modal title="Wprowadź korektę" open={open} onClose={handleClose}>
      <form
        onSubmit={handleSubmit(handlePictureAnalysisPost)}
        className={classes.form}
      >
        <Controller
          control={control}
          name="isRecognized"
          defaultValue={false}
          render={({ onChange, value }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={(_, c) => onChange(c)}
                  name="isRecognized"
                  indeterminate
                />
              }
              label="Czy rozpoznane?"
            />
          )}
        />

        {watch('isRecognized') && (
          <TextField
            error={!!errors.plateNumber}
            helperText={errors.plateNumber?.message}
            inputRef={register}
            fullWidth
            variant="filled"
            name="plateNumber"
            label="Rozpoznany numer rejestracyjny"
          />
        )}
        <Button color="primary" variant="contained" type="submit" fullWidth>
          Zapisz
        </Button>
      </form>
    </Modal>
  );
};

export default AddPictureAnalysis;
