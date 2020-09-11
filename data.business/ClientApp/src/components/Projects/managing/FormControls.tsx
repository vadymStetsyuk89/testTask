import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject, IProjectFormValues } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import FormLayout from './FormLayout';
import { Container, Button, Grid } from '@material-ui/core';
import { dialogActions } from '../../../reducers/dialogSlice';
import { assignPendingActions } from '../../../helpers/action.helper';
import { projectActions } from '../../../reducers/projectSlice';
import { IProjectEditFormState } from './ProjectEditForm';

export interface IFormControlsState {
  onDismis: () => void;
  formik: any;
}

const FormControls: React.FC<IFormControlsState> = (
  props: IFormControlsState
) => {
  return (
    <Grid
      container
      justify="flex-end"
      style={{ marginTop: 24, marginBottom: 24 }}
    >
      <Grid container alignItems="stretch" item xs={3} spacing={3}>
        <Grid item xs={6}>
          <Button
            fullWidth
            onClick={() => props.onDismis()}
            variant="contained"
          >
            Dismis
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            onClick={() => props.formik.submitForm()}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormControls;
