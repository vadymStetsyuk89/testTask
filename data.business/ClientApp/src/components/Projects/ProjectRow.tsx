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
import { dialogActions } from '../../reducers/dialogSlice';
import ProjectEditForm from './managing/ProjectEditForm';

export interface IProjectRowState {
  project: Prdoject;
}

const ProjectRow: React.FC<IProjectRowState> = (props: IProjectRowState) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(
      assignPendingActions(
        projectActions.apiDeleteProjectById(props.project.id),
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
  };

  const onEdit = () => {
    dispatch(projectActions.changeTargetProject(props.project));
    dispatch(
      dialogActions.openDialog({
        title: 'Edit',
        component: ProjectEditForm,
        description: 'Editing project',
      })
    );
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {props.project.name}
      </TableCell>
      <TableCell align="left">{props.project.customerName}</TableCell>
      <TableCell align="left">{props.project.rate}</TableCell>
      <TableCell align="left">{'TODO: Total time'}</TableCell>
      <TableCell align="left">{'TODO: Total profit'}</TableCell>
      <TableCell align="left">
        <Button onClick={onEdit} variant="contained" color="primary">
          Edit
        </Button>
        <Button onClick={onDelete} variant="contained" color="secondary">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
