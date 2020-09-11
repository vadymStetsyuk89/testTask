import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import { TextField, Grid, Paper, Box } from '@material-ui/core';
import Entry from './Entry';
import WorkingTimeEntry from './WorkingTimeEntry';
import WorkingTimeList from './WorkingTimeList';

export interface IFormLayoutState {
  formik: any;
}

const FormLayout: React.FC<IFormLayoutState> = (props: IFormLayoutState) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper style={{ padding: 12 }}>
          <Box marginBottom={2}>
            <Entry
              formik={props.formik}
              fieldName={'name'}
              label={'Project Name'}
              isRequired={true}
            />
          </Box>
          <Box marginBottom={2}>
            <Entry
              formik={props.formik}
              fieldName={'customerName'}
              label={'Customer Name'}
              isRequired={true}
            />
          </Box>
          <Box>
            <Entry
              formik={props.formik}
              fieldName={'rate'}
              label={'Rate'}
              isNumber={true}
              isRequired={true}
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <Paper style={{ padding: 12, marginBottom: 24 }}>
          <WorkingTimeEntry formik={props.formik} />
        </Paper>

        <Paper style={{ padding: 12 }}>
          <WorkingTimeList formik={props.formik} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FormLayout;
