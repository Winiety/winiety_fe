import { Button, TextField } from '@material-ui/core';
import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import profileGenerator, {
  UserProfile,
} from '../../generators/profile-generator';
import useStyles from './use-styles';

type UserProfileFormValues = UserProfile;

const formSchema: yup.SchemaOf<UserProfileFormValues> = yup
  .object()
  .shape({
    city: yup.string().required('Miasto jest wymagane'),
    country: yup.string().required('Państwo jest wymagane'),
    birthYear: yup
      .number()
      .lessThan(new Date().getFullYear() - 17, 'Musisz mieć 18 lat')
      .required('Rok urodzenia jest wymagany'),
    flatNumber: yup.number().required('Number domu jest wymagany'),
    phone: yup.string().required('Nr telefonu jest wymagany'),
    street: yup.string().required('Ulica jest wymagana'),
    zip: yup
      .string()
      .matches(/\d\d-\d\d\d/, 'ZIP musi być poprawny (99-999)')
      .required('ZIP jest wymagany'),
  })
  .required();

interface ProfileTabProps {
  className?: string;
}

const user = profileGenerator();

const ProfileTab = (props: ProfileTabProps): ReactElement => {
  const { className } = props;
  const { birthYear, city, country, flatNumber, phone, street, zip } = user;

  const classes = useStyles();

  const {
    handleSubmit,
    formState: { isDirty },
    register,
    reset,
    errors,
  } = useForm<UserProfileFormValues>({
    resolver: yupResolver(formSchema),
    shouldFocusError: true,
  });

  return (
    <form
      // eslint-disable-next-line no-console
      onSubmit={handleSubmit(console.log)}
      className={classNames(className, classes.root)}
    >
      <TextField
        fullWidth
        defaultValue={city}
        error={!!errors.city}
        helperText={errors.city?.message}
        name="city"
        label="Miasto"
        inputRef={register}
      />

      <TextField
        fullWidth
        error={!!errors.country}
        helperText={errors.country?.message}
        defaultValue={country}
        name="country"
        label="Kraj"
        inputRef={register}
      />

      <TextField
        fullWidth
        error={!!errors.street}
        helperText={errors.street?.message}
        name="street"
        defaultValue={street}
        label="Ulica"
        inputRef={register}
      />

      <TextField
        fullWidth
        error={!!errors.flatNumber}
        helperText={errors.flatNumber?.message}
        defaultValue={flatNumber}
        name="flatNumber"
        label="Nr domu"
        inputRef={register}
      />

      <TextField
        name="phone"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        fullWidth
        defaultValue={phone}
        label="Telefon"
        inputRef={register}
      />

      <TextField
        type="number"
        error={!!errors.birthYear}
        helperText={errors.birthYear?.message}
        fullWidth
        defaultValue={birthYear}
        name="birthYear"
        label="Rok urodzenia"
        inputRef={register}
      />

      <TextField
        error={!!errors.zip}
        helperText={errors.zip?.message}
        name="zip"
        fullWidth
        defaultValue={zip}
        label="Kod ZIP"
        inputRef={register}
      />

      <div hidden={!isDirty} className={classes.buttonsContainer}>
        <Button color="secondary" variant="outlined" onClick={() => reset()}>
          Anuluj zmiany
        </Button>
        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          type="submit"
        >
          Zapisz
        </Button>
      </div>
    </form>
  );
};

export default ProfileTab;
