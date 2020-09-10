import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import { TextField, Grid, Button } from '@material-ui/core';
import Entry from './Entry';

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

  const onInput = () => {
    if (name && name.length > 0 && from && to && to > from) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  React.useEffect(() => {
    onInput();
  }, [name, from, to]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item>
          <TextField
            value={name}
            onChange={(args: any) => {
              const value = args?.target?.value ? args.target.value : '';
              setName(value);
            }}
            label="Standard"
          />
        </Grid>
        <Grid>
          <TextField
            label="Next appointment"
            type="datetime-local"
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
        <Grid>
          <TextField
            label="Next appointment"
            type="datetime-local"
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

        <Grid>
          <Button
            disabled={isDisabled}
            variant="contained"
            color="primary"
            onClick={() => {
              debugger;
              let huj: any[] = [...props.formik.values.workingTiming];
              huj.push('132');

              props.formik.setFieldValue('workingTiming', huj);
              props.formik.setFieldTouched('workingTiming');
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default WorkingTimeEntry;
