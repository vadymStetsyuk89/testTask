import * as React from 'react';
import WorkingTimeItem from './WorkingTimeItem';
import './workingTimeList.scss';
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Typography,
  Container,
  Box,
} from '@material-ui/core';

export interface IWorkingTimeListState {
  formik: any;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const WorkingTimeList: React.FC<IWorkingTimeListState> = (
  props: IWorkingTimeListState
) => {
  const classes = useStyles();

  let ddd = [];

  ddd.length;

  return (
    <div className="workingTimeList">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Comment</TableCell>
              <TableCell align="left">Started at</TableCell>
              <TableCell align="left">Ended at</TableCell>
              <TableCell align="justify">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.formik.values.workingTiming.length > 0
              ? props.formik.values.workingTiming.map((item, index: number) => {
                  return (
                    <WorkingTimeItem
                      key={index}
                      itemIndex={index}
                      formik={props.formik}
                      item={item}
                    />
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>

      {props.formik.values.workingTiming.length > 0 ? null : (
        <Typography style={{ marginTop: 24 }} align="center">
          Add your first working time
        </Typography>
      )}
    </div>
  );
};

export default WorkingTimeList;
