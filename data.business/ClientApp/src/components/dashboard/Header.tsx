import * as React from 'react';
import './header.scss';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { projectActions } from '../../reducers/projectSlice';
import ProjectCreateForm from '../Projects/managing/ProjectCreateForm';
import { dialogActions } from '../../reducers/dialogSlice';

const Header = () => {
  const dispatch = useDispatch();

  const onNewProject = () => {
    dispatch(projectActions.changeTargetProject(null));
    dispatch(
      dialogActions.openDialog({
        title: 'Create new project',
        component: ProjectCreateForm,
        description: 'Editing project',
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
          onClick={onNewProject}
          color="inherit"
          aria-label="add to shopping cart"
        >
          <Tooltip title="Add new project" aria-label="add">
            <AddCircleOutlineIcon />
          </Tooltip>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
