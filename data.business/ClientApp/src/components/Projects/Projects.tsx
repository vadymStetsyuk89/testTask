import * as React from 'react';
import './projects.scss';
import { Button, Container, Grid } from '@material-ui/core';
import ProjectsTable from './ProjectsTable';
import { useDispatch } from 'react-redux';
import { projectActions } from '../../reducers/projectSlice';
import { dialogActions } from '../../reducers/dialogSlice';
import ProjectCreateForm from './managing/ProjectCreateForm';

const Projects: React.FC<any> = () => {
  return (
    <div className="projects">
      <ProjectsTable />
    </div>
  );
};

export default Projects;
