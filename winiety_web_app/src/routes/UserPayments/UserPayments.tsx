import {
  Button,
  Container,
  CssBaseline,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { Payment } from 'api/types';
import useStyles from './use-styles';

const statuses = [
  { label: 'Nowa', value: 'NEW' },
  { label: 'Oczekująca', value: 'PENDING' },
  { label: 'Anulowana', value: 'CANCELED' },
  { label: 'Zakończona', value: 'COMPLETED' },
];

const UserPayments = (): ReactElement => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [stat, setStatus] = React.useState('NEW');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getData, data] = PaymentsRepository.useGetUserPayments();
  const postData = PaymentsRepository.usePostPayment();

  useEffect(() => {
    if (stat) {
      getData({
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        status: stat,
      });
    } else {
      getData({
        pageNumber: page + 1,
        pageSize: rowsPerPage,
      });
    }
  }, [getData, page, rowsPerPage, stat]);

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

  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const handlePostPayment = async (payment: Payment) => {
    if (payment.status === 'CANCELED' || payment.payuUrl === null) {
      const url = await postData({
        paymentId: payment.id,
        continueUrl: window.location.href,
      });
      window.open(url, '_self');
    } else {
      window.open(payment.payuUrl, '_self');
    }
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <InputLabel shrink id="group-by-label">
            Status płatności
          </InputLabel>
          <Select fullWidth onChange={handleChangeStatus} value={stat}>
            {statuses.map(({ label, value: val }) => (
              <MenuItem key={val} id={val} value={val}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="medium" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Naliczona opłata</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {((!!data && data.results) || []).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.amount} PLN</TableCell>
                <TableCell>
                  {row.status !== 'COMPLETED' && row.status !== 'PENDING' && (
                    <Button
                      onClick={() => handlePostPayment(row)}
                      variant="contained"
                      color="primary"
                    >
                      Zapłać
                    </Button>
                  )}
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

export default UserPayments;
