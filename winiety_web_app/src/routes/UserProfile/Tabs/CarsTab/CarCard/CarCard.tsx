import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Divider,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { UserCar } from 'routes/UserProfile/generators/car-generator';
import classNames from 'classnames';
import { useStoreState } from 'store';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import useStyles from './use-styles';

interface CarTabProps extends UserCar {
  className?: string;
}

const CarTab = (props: CarTabProps): ReactElement => {
  const { className, brand, model, year, plateNumber, color } = props;
  const classes = useStyles();
  const isDarkTheme = useStoreState((state) => state.userSettings.isDarkTheme);
  return (
    <Card className={classNames(className, classes.root)}>
      <div
        className={classes.colorBar}
        style={{
          backgroundColor: color,
          borderRight:
            !isDarkTheme && color === 'white' ? '1px solid grey' : undefined,
        }}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5">{`${brand} ${model}`}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {year}
          </Typography>
          <Typography variant="h4">{plateNumber}</Typography>
        </CardContent>
      </div>
      <Divider component="div" orientation="vertical" flexItem />
      <CardMedia className={classes.cover}>
        <DirectionsCarIcon className={classes.carIcon} />
      </CardMedia>
    </Card>
  );
};

export default CarTab;
