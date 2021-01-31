import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Divider,
  IconButton,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { UserCar } from 'api/types';
import classNames from 'classnames';
import { useStoreState } from 'store';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './use-styles';
import { AreYouSureDeleteCarModal } from '../Modals';

interface CarTabProps extends UserCar {
  onDelete: (id: number) => void;
  className?: string;
}

const CarTab = (props: CarTabProps): ReactElement => {
  const {
    className,
    brand,
    model,
    year,
    plateNumber,
    color,
    id,
    onDelete,
  } = props;
  const classes = useStyles();
  const isDarkTheme = useStoreState((state) => state.userSettings.isDarkTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);

  const handleDelete = () => {
    setIsModalOpen(false);
    onDelete(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
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
          <IconButton
            onClick={openModal}
            className={classes.deleteIcon}
            size="small"
          >
            <DeleteIcon fontSize="inherit" color="secondary" />
          </IconButton>
        </CardMedia>
      </Card>
      <AreYouSureDeleteCarModal
        brand={brand}
        model={model}
        open={isModalOpen}
        handleClose={handleModalClose}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CarTab;
