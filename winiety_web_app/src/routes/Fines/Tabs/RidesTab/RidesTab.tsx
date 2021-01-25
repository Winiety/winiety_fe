import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import rideGenerator from '../../generators/ride-generator';
import useStyles from './use-styles';
import { AddFineModal } from './Modals';

interface CarsTabProps {
  className?: string;
}
const fines = Array.from(Array(12), () => rideGenerator());

const RidesTab = (props: CarsTabProps): ReactElement => {
  const { className } = props;
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, fines.length - page * rowsPerPage);

  return (
    <div className={className}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="simple table"
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell width="10%" />
              <TableCell width="10%">Czas przejazdu</TableCell>
              <TableCell width="10%">Numer rejestracyjny</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.plateNumber}>
                  <TableCell>
                    <Button
                      onClick={handleModalOpen}
                      variant="contained"
                      color="primary"
                    >
                      Wystaw mandat
                    </Button>
                  </TableCell>
                  <TableCell>{row.rideDateTime} minut</TableCell>
                  <TableCell component="th" scope="row">
                    {row.plateNumber}
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 50 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage=""
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={fines.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddFineModal open={isModalOpen} handleClose={handleModalClose} />
    </div>
  );
};

export default RidesTab;
