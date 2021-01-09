import { Button, Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';
import CarCard from './CarCard';
import carGenerator from '../../generators/car-generator';
import useStyles from './use-styles';

interface CarsTabProps {
  className?: string;
}
const cars = Array.from(Array(5), () => carGenerator());
const CarsTab = (props: CarsTabProps): ReactElement => {
  const { className } = props;
  const classes = useStyles();
  return (
    <div className={className}>
      <Button variant="contained" color="primary" fullWidth>
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
    </div>
  );
};

export default CarsTab;
