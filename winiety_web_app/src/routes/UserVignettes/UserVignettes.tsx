import {
  Button,
  Container,
  CssBaseline,
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
import { PaymentsRepository } from 'api/repository';
import { format, parseISO } from 'date-fns';
import ReactGA from 'react-ga';
import useStyles from './use-styles';

const UserVigettes = (): ReactElement => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getData, data] = PaymentsRepository.useGetUserVignettes();
  const postVignetteData = PaymentsRepository.usePostVignette();

  useEffect(() => {
    getData({
      pageNumber: page + 1,
      pageSize: rowsPerPage,
    });
  }, [getData, page, rowsPerPage]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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

  const handleBuyVignette = async () => {
    const url = await postVignetteData({
      continueUrl: window.location.href,
    });
    ReactGA.event({
      category: 'Vignette purchase',
      action: 'User pressed buy vignette button',
    });
    window.open(url, '_self');
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Button
            onClick={handleBuyVignette}
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Kup winietę
          </Button>
        </div>
      </Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="medium" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Koszt winiety</TableCell>
              <TableCell>Data wygaśnięcia</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {((!!data && data.results) || []).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.cost} PLN</TableCell>
                <TableCell>
                  {format(parseISO(row.expirationDate), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>
                  {row.isActive ? 'Aktywna' : 'Nieaktywna'}{' '}
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
    </div>
  );
};

export default UserVigettes;
