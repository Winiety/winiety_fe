import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { ProfileRepository } from 'api/repository';
import { UserCar } from 'api/types';
import CarCard from './CarCard';
import useStyles from './use-styles';
import { AddCarModal } from './Modals';

interface CarsTabProps {
  className?: string;
}
const CarsTab = (props: CarsTabProps): ReactElement => {
  const { className } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();

  const [cars, updateCar, deleteCar] = ProfileRepository.useGetCars();
  const addCar = ProfileRepository.useAddCar(undefined, (newCar) => {
    updateCar(newCar);
    setIsModalOpen(false);
  });

  const deleteCarLazy = ProfileRepository.useDeleteCar(undefined, (id) =>
    deleteCar(id)
  );

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddCar = (car: Omit<UserCar, 'id'>) => {
    addCar(car);
  };

  if (cars === undefined)
    return (
      <div className="flex-container">
        <CircularProgress />
      </div>
    );

  if (cars === null) return <Typography>Wystąpił błąd.</Typography>;

  return (
    <div className={className}>
      <Button
        onClick={handleModalOpen}
        variant="contained"
        color="primary"
        fullWidth
      >
        Dodaj samochód
      </Button>
      <Grid className={classes.grid} container spacing={2}>
        {cars.map(({ brand, color, model, plateNumber, year, id }) => (
          <Grid item xs={12} md={6} key={id}>
            <CarCard
              id={id}
              brand={brand}
              color={color}
              model={model}
              plateNumber={plateNumber}
              year={year}
              onDelete={deleteCarLazy}
            />
          </Grid>
        ))}
      </Grid>
      <AddCarModal
        onAddCar={handleAddCar}
        open={isModalOpen}
        handleClose={handleModalClose}
      />
    </div>
  );
};

export default CarsTab;
