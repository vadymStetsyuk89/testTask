import { Button, ButtonGroup, TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { assignPendingActions } from '../../helpers/action.helper';
import {
  buildProfitString,
  buildProjectTotalTimeString,
} from '../../helpers/timeParsing.helper';
import { Prdoject } from '../../model/project/prdoject';
import { dialogActions } from '../../reducers/dialogSlice';
import { projectActions } from '../../reducers/projectSlice';
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
      <TableCell align="left">{`${props.project.rate}$`}</TableCell>
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
