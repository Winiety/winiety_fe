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
import { PictureRepository } from 'api/repository';
import useStyles from './use-styles';
import { AddPictureAnalysis } from './Modals';

const Errors = (): ReactElement => {
  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pictureId, setPictureId] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getData, data] = PictureRepository.useGetAllNotRecognizedPictures();

  useEffect(() => {
    getData({ pageNumber: page + 1, pageSize: rowsPerPage });
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
  };

  const handleOpenImage = async (path: string) => {
    window.open(path, '_blank');
  };

  const handleModalOpen = (id: number) => {
    setIsModalOpen(true);
    setPictureId(id);
  };

  const handleReload = () => {
    getData({ pageNumber: page + 1, pageSize: rowsPerPage });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
              <TableCell>Numer rejestracyjny</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {((!!data && data.results) || []).map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.isRecognized ? row.plateNumber : `Nie rozpoznano`}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => handleOpenImage(row.imagePath)}
                    variant="contained"
                    color="primary"
                  >
                    Zdjęcie
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => handleModalOpen(row.id)}
                    variant="contained"
                    color="primary"
                  >
                    Wprowadź korektę
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
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data?.totalCount || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddPictureAnalysis
        open={isModalOpen}
        handleClose={handleModalClose}
        pictureId={pictureId}
        handleReload={handleReload}
      />
    </div>
  );
};

export default Errors;
