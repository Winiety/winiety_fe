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
import React, { ReactElement, useEffect } from 'react';
import { ComplaintRepository, PictureRepository } from 'api/repository';
import { format, parseISO } from 'date-fns';
import useStyles from './use-styles';

const Complaints = (): ReactElement => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getData, data] = ComplaintRepository.useGetAllComplaints();
  const getPicture = PictureRepository.useGetPicturePath();

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

  const handleOpenImage = async (id: number) => {
    const path = await getPicture(id);
    window.open(path, '_blank');
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
              <TableCell>Treść zażalenia</TableCell>
              <TableCell>Data wystawienia</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {((!!data && data.results) || []).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.plateNumber}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell component="th" scope="row">
                  {format(parseISO(row.createTime), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => handleOpenImage(row.pictureId)}
                    variant="contained"
                    color="primary"
                  >
                    Zdjęcie
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
    </div>
  );
};

export default Complaints;
