import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { dialogActions } from '../../reducers/dialogSlice';
import { projectActions } from '../../reducers/projectSlice';
import ProjectCreateForm from '../Projects/managing/ProjectCreateForm';
import TotalInfo from '../Projects/totalInfo/TotalInfo';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();

  const onNewProjectClick = () => {
    dispatch(projectActions.changeTargetProject(null));
    dispatch(
      dialogActions.openDialog({
        title: 'Create new project',
        component: ProjectCreateForm,
        description: 'Editing project',
        maxWidth: 'lg',
      })
    );
  };

  const onTotalInfoClick = () => {
    dispatch(
      dialogActions.openDialog({
        title: 'Total info',
        component: TotalInfo,
        description: 'Total info',
        maxWidth: 'sm',
      })
    );
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Project management
        </Typography>

        <IconButton
          onClick={onNewProjectClick}
          color="inherit"
          aria-label="new project"
        >
          <Tooltip title="Add new project" aria-label="add">
            <AddCircleOutlineIcon />
          </Tooltip>
        </IconButton>

        <IconButton
          onClick={onTotalInfoClick}
          color="inherit"
          aria-label="total info"
        >
          <Tooltip title="Total info" aria-label="info">
            <InfoIcon />
          </Tooltip>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
