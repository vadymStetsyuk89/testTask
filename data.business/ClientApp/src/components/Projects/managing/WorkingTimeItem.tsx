import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import { TextField, Grid, Button } from '@material-ui/core';
import Entry from './Entry';
import { List } from 'linq-typescript';

export interface IWorkingTimeItemState {
  formik: any;
  item: any;
}

const WorkingTimeItem: React.FC<IWorkingTimeItemState> = (
  props: IWorkingTimeItemState
) => {
  const onRemove = () => {
    let updatedValues: any[] = new List<any>(props.formik.values.workingTiming)
      .where((item) => item !== props.item)
      .toArray();

    props.formik.setFieldValue('workingTiming', updatedValues);
    props.formik.setFieldTouched('workingTiming');
  };

  return (
    <>
      <Grid container>
        <Grid item>{props.item}</Grid>
        <Grid item>
          <Button
            onClick={() => onRemove()}
            variant="contained"
            color="secondary"
          >
            Secondary
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default WorkingTimeItem;
