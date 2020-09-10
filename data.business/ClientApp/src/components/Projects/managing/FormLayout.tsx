import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import { TextField, Grid } from '@material-ui/core';
import Entry from './Entry';
import WorkingTimeEntry from './WorkingTimeEntry';
import WorkingTimeList from './WorkingTimeList';

export interface IFormLayoutState {
  formik: any;
}

const FormLayout: React.FC<IFormLayoutState> = (props: IFormLayoutState) => {
  return (
    <Grid container>
      <Grid container item spacing={3} xs={4}>
        <Grid item xs={12}>
          <Entry
            formik={props.formik}
            fieldName={'name'}
            label={'Project Name'}
            isRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Entry
            formik={props.formik}
            fieldName={'customerName'}
            label={'Customer Name'}
            isRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Entry
            formik={props.formik}
            fieldName={'rate'}
            label={'Rate'}
            isNumber={true}
            isRequired={true}
          />
        </Grid>
      </Grid>

      <Grid container item xs={8} spacing={3}>
        <Grid item>
          <WorkingTimeEntry formik={props.formik} />
        </Grid>
        <Grid item>
          <WorkingTimeList formik={props.formik} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormLayout;
