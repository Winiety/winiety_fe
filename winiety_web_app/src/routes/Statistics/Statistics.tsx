import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  useTheme,
} from '@material-ui/core';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from 'recharts';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import React, { ReactElement, useMemo, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { subMonths } from 'date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { StatisticsRepository } from 'api/repository';
import useStyles from './use-styles';

const groups = [
  { label: 'Dzień', value: 'DAY' },
  { label: 'Tydzień', value: 'WEEK' },
  { label: 'Miesiąc', value: 'MONTH' },
  { label: 'Rok', value: 'YEAR' },
];

const Statistics = (): ReactElement => {
  const classes = useStyles();
  const {
    palette: { primary },
  } = useTheme();

  const [
    statistics,
    getStatistics,
    isLoading,
  ] = StatisticsRepository.useGetStatistics();

  const chartData = useMemo(() => {
    if (!statistics) return statistics;
    return Array.from({ length: statistics.xValues.length }, (v, k) => ({
      x: statistics.xValues[k],
      y: statistics.yValues[k],
    }));
  }, [statistics]);

  const [startDate, setStartDate] = useState<Date | null>(
    subMonths(new Date(), 1)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [groupBy, setGroupBy] = useState('MONTH');

  const handleStartDateChange = (date: MaterialUiPickersDate) =>
    setStartDate(date);

  const handleEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);

  const handleGroupByChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    setGroupBy(event.target.value as string);

  const handleGetStatistics = () =>
    getStatistics({
      dateFrom: startDate?.toISOString(),
      dateTo: endDate?.toISOString(),
      query: groupBy,
    });

  return (
    <div className={classes.root}>
      <Paper className={classes.paperTop}>
        <FormControl className={classes.formControl}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              variant="inline"
              format="dd-MM-yyyy"
              margin="normal"
              onChange={handleStartDateChange}
              value={startDate}
              id="date-from"
              label="Data początkowa"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl className={classes.formControl}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              variant="inline"
              format="dd-MM-yyyy"
              margin="normal"
              onChange={handleEndDateChange}
              value={endDate}
              id="date-to"
              label="Data końcowa"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <FormControl className={classes.selectControl}>
          <InputLabel id="group-by-label">Grupowanie danych</InputLabel>
          <Select
            labelId="group-by-label"
            fullWidth
            onChange={handleGroupByChange}
            value={groupBy}
          >
            {groups.map(({ label, value: val }) => (
              <MenuItem key={val} id={val} value={val}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleGetStatistics}
          variant="contained"
          fullWidth
          color="primary"
        >
          Wyświetl
        </Button>
      </Paper>
      <Paper className={classes.chartContainer}>
        {isLoading && !statistics && (
          <div className="flex-container">
            <CircularProgress />
          </div>
        )}
        {isLoading && !!statistics && <LinearProgress />}
        {statistics && chartData && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ bottom: 10 }} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x">
                <Label
                  value={statistics.xTitle}
                  offset={-5}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis
                label={{
                  value: statistics.yTitle,
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="y"
                stroke={primary.main}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </div>
  );
};

export default Statistics;
