import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject, WorkingTime } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import {
  TextField,
  Grid,
  Button,
  TableRow,
  TableCell,
} from '@material-ui/core';
import Entry from './Entry';
import { List } from 'linq-typescript';
import {
  dateToString,
  dateToFormatedString,
} from '../../../helpers/date.helper';

export interface IWorkingTimeItemState {
  formik: any;
  item: WorkingTime;
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
      <TableRow>
        <TableCell component="th" scope="row">
          {props.item.name}
        </TableCell>
        <TableCell align="left">
          {dateToFormatedString(props.item.startedAt)}
        </TableCell>
        <TableCell align="left">
          {dateToFormatedString(props.item.endedAt)}
        </TableCell>
        <TableCell align="left">
          <Button
            onClick={() => onRemove()}
            variant="contained"
            color="secondary"
          >
            Remove
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default WorkingTimeItem;
