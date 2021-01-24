import { Button, Grid } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import CarCard from './CarCard';
import carGenerator from '../../generators/car-generator';
import useStyles from './use-styles';
import { AddCarModal } from './Modals';

interface CarsTabProps {
  className?: string;
}
const cars = Array.from(Array(5), () => carGenerator());
const CarsTab = (props: CarsTabProps): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { className } = props;
  const classes = useStyles();

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

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
        {cars.map(({ brand, color, model, plateNumber, year }) => (
          <Grid item xs={12} md={6}>
            <CarCard
              brand={brand}
              color={color}
              model={model}
              plateNumber={plateNumber}
              year={year}
            />
          </Grid>
        ))}
      </Grid>
      <AddCarModal open={isModalOpen} handleClose={handleModalClose} />
    </div>
  );
};

export default CarsTab;
