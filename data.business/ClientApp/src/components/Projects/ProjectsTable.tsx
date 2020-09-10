import * as React from 'react';
import './projectsTable.scss';
import {
  Button,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  makeStyles,
  TableBody,
  Container,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { assignPendingActions } from '../../helpers/action.helper';
import { projectActions } from '../../reducers/projectSlice';
import { IApplicationState } from '../../reducers/rootReducer';
import { Prdoject } from '../../model/project/prdoject';
import ProjectRow from './ProjectRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProjectsTable: React.FC<any> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const prdoject: Prdoject[] = useSelector<IApplicationState, Prdoject[]>(
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
          dispatch(projectActions.setProjectList(args));
        },
        (args: any) => {
          dispatch(projectActions.setProjectList(args));
        }
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
              <TableCell align="left">Rate</TableCell>
              <TableCell align="left">Total time</TableCell>
              <TableCell align="left">Total profit</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prdoject.map((project: Prdoject, index: number) => (
              <ProjectRow key={index} project={project} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectsTable;
