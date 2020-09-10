import * as React from 'react';
import './projects.scss';
import { Button } from '@material-ui/core';
import ProjectsTable from './ProjectsTable';
import { useDispatch } from 'react-redux';
import { projectActions } from '../../reducers/projectSlice';
import { dialogActions } from '../../reducers/dialogSlice';
import ProjectCreateForm from './managing/ProjectCreateForm';

const Projects: React.FC<any> = () => {
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
    <div className="projects">
      <Button onClick={onNewProject} variant="contained" color="primary">
        Add new project
      </Button>

      <ProjectsTable />
    </div>
  );
};

export default Projects;
