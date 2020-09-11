import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignPendingActions } from '../../helpers/action.helper';
import { Prdoject } from '../../model/project/prdoject';
import { projectActions } from '../../reducers/projectSlice';
import { IApplicationState } from '../../reducers/rootReducer';
import ProjectRow from './ProjectRow';
import './projectsTable.scss';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProjectsTable: React.FC<any> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const prdojects: Prdoject[] = useSelector<IApplicationState, Prdoject[]>(
    (state) => {
      return state.project.projects;
    }
  );

  React.useEffect(() => {
    dispatch(
      assignPendingActions(
        projectActions.apiGetAllProjects(),
        [],
        [],
        (args: any) => {
          /// TODO
          dispatch(projectActions.setProjectList(args));
        },
        (args: any) => {}
      )
    );

    return () => {};
  }, []);

  return (
    <div className="projectsTable">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Rate (per hour)</TableCell>
              <TableCell align="left">Total time</TableCell>
              <TableCell align="left">Total profit</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prdojects.map((project: Prdoject, index: number) => (
              <ProjectRow key={index} project={project} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {prdojects && prdojects.length === 0 ? (
        <Typography variant="h6" style={{ marginTop: 24 }} align="center">
          Add your first project
        </Typography>
      ) : null}
    </div>
  );
};

export default ProjectsTable;
