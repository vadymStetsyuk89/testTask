import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject, WorkingTime } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import { TextField, Grid, Button, Box, Container } from '@material-ui/core';
import Entry from './Entry';
import { dateToFormatedString } from '../../../helpers/date.helper';
import * as moment from 'moment';

export interface IWorkingTimeEntryState {
  formik: any;
}

const WorkingTimeEntry: React.FC<IWorkingTimeEntryState> = (
  props: IWorkingTimeEntryState
) => {
  const [name, setName] = React.useState<string>('');
  const [from, setFrom] = React.useState<Date>();
  const [to, setTo] = React.useState<Date>();
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    onInput();
  }, [name, from, to]);

  const onInput = () => {
    if (name && name.length > 0 && from && to && to > from) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const clearEntry = () => {
    setName('');
  };

  const onAddClick = () => {
    let timingValues: any[] = [...props.formik.values.workingTiming];
    timingValues.push(buildWorkingTime());

    props.formik.setFieldValue('workingTiming', timingValues);
    props.formik.setFieldTouched('workingTiming');

    clearEntry();
  };

  const buildWorkingTime = () => {
    let newWorkingTime = new WorkingTime();
    newWorkingTime.name = name;
    newWorkingTime.startedAt = from;
    newWorkingTime.endedAt = to;

    return newWorkingTime;
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            value={name}
            fullWidth
            variant="outlined"
            onChange={(args: any) => {
              const value = args?.target?.value ? args.target.value : '';
              setName(value);
            }}
            label="Timing mark"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Started at"
            type="datetime-local"
            variant="outlined"
            onChange={(args: any) => {
              const value = args?.target?.value ? args.target.value : '';
              let date = new Date(value);
              setFrom(date);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Ended at"
            type="datetime-local"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(args: any) => {
              const value = args?.target?.value ? args.target.value : '';
              let date = new Date(value);
              setTo(date);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            style={{ marginTop: 9 }}
            fullWidth
            disabled={isDisabled}
            variant="contained"
            color="primary"
            onClick={() => {
              onAddClick();
            }}
          >
            Add time
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default WorkingTimeEntry;
