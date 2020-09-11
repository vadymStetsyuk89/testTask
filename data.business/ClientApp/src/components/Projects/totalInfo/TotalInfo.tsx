import * as React from 'react';
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
  Grid,
  Button,
} from '@material-ui/core';
import { Prdoject } from '../../../model/project/prdoject';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../../../reducers/rootReducer';
import {
  buildBulkProjectTotalTimeString,
  buildBulkProfitString,
} from '../../../helpers/timeParsing.helper';
import { dialogActions } from '../../../reducers/dialogSlice';

export interface ITotalInfoState {}

const TotalInfo: React.FC<ITotalInfoState> = (props: ITotalInfoState) => {
  const dispatch = useDispatch();

  const prdojects: Prdoject[] = useSelector<IApplicationState, Prdoject[]>(
    (state) => {
      return state.project.projects;
    }
  );

  const onOkClick = () => {
    dispatch(dialogActions.closeDialog());
  };

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography>
              {`Projects count: ${prdojects ? prdojects.length : 0}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {`Total time: ${buildBulkProjectTotalTimeString(prdojects)}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {`Total profit: ${buildBulkProfitString(prdojects)}`}
            </Typography>
          </Grid>

          <Grid
            container
            justify="flex-end"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            <Grid item xs={2}>
              <Button
                fullWidth
                onClick={() => onOkClick()}
                variant="contained"
                color="primary"
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TotalInfo;
