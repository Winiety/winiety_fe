import {
  Button,
  Container,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { ReactElement } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatisticsRepository } from 'api/repository';
import useStyles from './use-styles';

const groups = [
  { label: 'Dzień', value: 'DAY' },
  { label: 'Tydzień', value: 'WEEK' },
  { label: 'Miesiąc', value: 'MONTH' },
  { label: 'Rok', value: 'YEAR' },
];

enum FileType {
  CSV = 'csv',
  JSON = 'json',
}

interface StatisticsForm {
  dateFrom: Date | undefined | null;
  dateTo: Date | undefined | null;
  groupBy: string | undefined;
  fileType: string;
}

type StatisticsFormValues = StatisticsForm;

const formSchema: yup.SchemaOf<StatisticsFormValues> = yup.object().shape({
  dateFrom: yup.date().nullable(),
  dateTo: yup.date().nullable(),
  groupBy: yup.string(),
  fileType: yup.string().required(),
});

const StatisticsFiles = (): ReactElement => {
  const classes = useStyles();

  const getCsv = StatisticsRepository.useGetCsvFile();
  const getJson = StatisticsRepository.useGetJsonFile();

  const { handleSubmit, control } = useForm<StatisticsFormValues>({
    resolver: yupResolver(formSchema),
    shouldFocusError: true,
  });

  const handleGetStatistics = (formData: StatisticsForm) => {
    if (formData.fileType === 'csv') {
      getCsv({
        dateFrom: formData.dateFrom?.toDateString(),
        dateTo: formData.dateTo?.toDateString(),
        groupBy: formData.groupBy,
      });
    } else {
      getJson({
        dateFrom: formData.dateFrom?.toDateString(),
        dateTo: formData.dateTo?.toDateString(),
        groupBy: formData.groupBy,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          onSubmit={handleSubmit(handleGetStatistics)}
          className={classes.form}
        >
          <Controller
            control={control}
            name="dateFrom"
            defaultValue={null}
            render={({ onChange, value }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="dd-MM-yyyy"
                  margin="normal"
                  onChange={onChange}
                  value={value}
                  id="date-from"
                  label="Data początkowa"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            )}
          />
          <Controller
            control={control}
            name="dateTo"
            defaultValue={new Date()}
            render={({ onChange, value }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="dd-MM-yyyy"
                  margin="normal"
                  onChange={onChange}
                  value={value}
                  id="date-to"
                  label="Data końcowa"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            )}
          />
          <Controller
            control={control}
            name="groupBy"
            defaultValue="MONTH"
            render={({ onChange, value }) => (
              <>
                <InputLabel
                  shrink
                  id="group-by-label"
                  className={classes.selectLabel}
                >
                  Grupowanie danych
                </InputLabel>
                <Select fullWidth onChange={onChange} value={value}>
                  {groups.map(({ label, value: val }) => (
                    <MenuItem key={val} id={val} value={val}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          />
          <Controller
            control={control}
            name="fileType"
            defaultValue={FileType.CSV}
            render={({ onChange, value }) => (
              <>
                <InputLabel
                  shrink
                  id="file-type-label"
                  className={classes.selectLabel}
                >
                  Rodzaj pliku
                </InputLabel>
                <Select fullWidth onChange={onChange} value={value}>
                  {Object.values(FileType).map((group) => (
                    <MenuItem key={group} id={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            className={classes.button}
          >
            Wygeneruj raport
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default StatisticsFiles;
