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
import { FineRepository, PictureRepository } from 'api/repository';
import { format, parseISO } from 'date-fns';
import useStyles from './use-styles';

interface CarsTabProps {
  className?: string;
}

const FinesTab = (props: CarsTabProps): ReactElement => {
  const classes = useStyles();
  const { className } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getData, data] = FineRepository.useGetUserFines();
  const getPicture = PictureRepository.useGetPicturePath();

  useEffect(() => {
    getData({ pageNumber: page + 1, pageSize: rowsPerPage });
  }, [getData, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
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
    <div className={className}>
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
              <TableCell>Opis mandatu</TableCell>
              <TableCell>Wysokość mandatu</TableCell>
              <TableCell>Data wystawienia</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {((!!data && data.results) || []).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.plateNumber}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.cost} PLN</TableCell>
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

export default FinesTab;
