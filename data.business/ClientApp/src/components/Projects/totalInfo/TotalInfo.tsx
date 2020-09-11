import { Button, Container, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  buildBulkProfitString,
  buildBulkProjectTotalTimeString,
} from '../../../helpers/timeParsing.helper';
import { Prdoject } from '../../../model/project/prdoject';
import { dialogActions } from '../../../reducers/dialogSlice';
import { IApplicationState } from '../../../reducers/rootReducer';

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
