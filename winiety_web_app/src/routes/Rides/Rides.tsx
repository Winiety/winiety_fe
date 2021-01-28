import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { RideRepository, PictureRepository } from 'api/repository';
import useStyles from './use-styles';
import { AddComplaintModal } from './Modals';

const Rides = (): ReactElement => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rideId, setRideId] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getData, data] = RideRepository.useGetUserRides();
  const getPicture = PictureRepository.useGetPicturePath();

  useEffect(() => {
    getData({
      pageNumber: page + 1,
      pageSize: rowsPerPage,
    });
  }, [getData, page, rowsPerPage]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalOpen = (id: number) => {
    setIsModalOpen(true);
    setRideId(id);
  };

  const handleOpenImage = async (id: number) => {
    const path = await getPicture(id);
    window.open(path, '_blank');
  };

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="simple table"
          size="medium"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell width="10%">Czas przejazdu</TableCell>
              <TableCell width="10%">Zmierzona prędkość</TableCell>
              <TableCell width="10%">Numer rejestracyjny</TableCell>
              <TableCell width="10%" />
              <TableCell width="10%" />
            </TableRow>
          </TableHead>
          <TableBody>
            {((!!data && data.results) || []).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.rideDateTime}</TableCell>
                <TableCell>{row.speed} km/h</TableCell>
                <TableCell component="th" scope="row">
                  {row.plateNumber}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => handleOpenImage(row.id)}
                    variant="contained"
                    color="primary"
                  >
                    Zdjęcie
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleModalOpen(row.id)}
                    variant="contained"
                    color="primary"
                  >
                    Zgłoś zażalenie
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage=""
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.totalCount || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddComplaintModal
        open={isModalOpen}
        handleClose={handleModalClose}
        rideId={rideId}
      />
    </div>
  );
};

export default Rides;
