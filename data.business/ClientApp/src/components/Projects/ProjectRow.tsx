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
  ButtonGroup,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { assignPendingActions } from '../../helpers/action.helper';
import { projectActions } from '../../reducers/projectSlice';
import { IApplicationState } from '../../reducers/rootReducer';
import { Prdoject, WorkingTime } from '../../model/project/prdoject';
import { dialogActions } from '../../reducers/dialogSlice';
import ProjectEditForm from './managing/ProjectEditForm';
import { List } from 'linq-typescript';
import {
  buildProjectTotalTimeString,
  buildProfitString,
} from '../../helpers/timeParsing.helper';

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
        title: `Edit ${props.project.name}`,
        component: ProjectEditForm,
        maxWidth: 'lg',
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
      <TableCell align="left">
        {buildProjectTotalTimeString(props.project)}
      </TableCell>
      <TableCell align="left">{buildProfitString(props.project)}</TableCell>
      <TableCell align="left">
        <ButtonGroup
          disableElevation
          color="primary"
          aria-label="large outlined primary button group"
        >
          <Button onClick={onEdit} color="primary">
            Edit
          </Button>
          <Button onClick={onDelete} color="secondary">
            Delete
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
