import React, { ReactElement, useState } from 'react';
import { Modal } from 'components';
import {
  Button,
  Popover,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { UserCar } from 'routes/UserProfile/generators/car-generator';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChromePicker } from 'react-color';
import useStyles from './use-styles';

interface AddCarModalProps {
  open: boolean;
  handleClose: () => void;
}

type CarFormValues = UserCar;

const formSchema: yup.SchemaOf<CarFormValues> = yup.object().shape({
  brand: yup.string().required('Marka pojazdu jest wymagana'),
  model: yup.string().required('Model pojazdu jest wymagany'),
  color: yup.string().required('Kolor pojazdu jest wymagany'),
  plateNumber: yup.string().required('Nr tablicy rejestracyjnej jest wymagany'),
  year: yup.string().required('Rok produkcji pojazdu jest wymagany'),
});

const AddCarModal = (props: AddCarModalProps): ReactElement => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const {
    palette: {
      background: { default: themeBgColor },
    },
  } = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  const { handleSubmit, register, errors, control } = useForm<CarFormValues>({
    resolver: yupResolver(formSchema),
    shouldFocusError: true,
  });

  return (
    <Modal title="Dodaj samochód" open={open} onClose={handleClose}>
      <>
        {/* eslint-disable-next-line no-console */}
        <form onSubmit={handleSubmit(console.log)} className={classes.form}>
          <TextField
            error={!!errors.plateNumber}
            helperText={errors.plateNumber?.message}
            inputRef={register}
            fullWidth
            name="plateNumber"
            label="Tablica rejestracyjna"
          />
          <TextField
            error={!!errors.brand}
            helperText={errors.brand?.message}
            inputRef={register}
            fullWidth
            name="brand"
            label="Marka"
          />
          <TextField
            error={!!errors.model}
            helperText={errors.model?.message}
            inputRef={register}
            fullWidth
            name="model"
            label="Model"
          />
          {/* TODO: Make a select */}
          <Controller
            control={control}
            name="color"
            label="Kolor"
            render={({ onChange, value }) => (
              <div>
                <Button
                  style={{ backgroundColor: value || undefined }}
                  variant="contained"
                  onClick={handleClick}
                >
                  Wybierz kolor
                </Button>
                <Popover
                  className={classes.colorPicker}
                  // id={id}
                  open={popoverOpen}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <ChromePicker
                    styles={{
                      default: {
                        body: { backgroundColor: themeBgColor },
                      },
                    }}
                    color={value}
                    onChange={(e) => onChange(e.hex)}
                  />
                </Popover>
              </div>
            )}
          />
          {!!errors.color && (
            <Typography className="color-error" variant="caption">
              {errors.color?.message}
            </Typography>
          )}
          <TextField
            error={!!errors.year}
            helperText={errors.year?.message}
            inputRef={register}
            fullWidth
            name="year"
            label="Rok produkcji"
          />
          <Button color="primary" variant="contained" type="submit" fullWidth>
            Zapisz
          </Button>
        </form>
      </>
    </Modal>
  );
};

export default AddCarModal;
