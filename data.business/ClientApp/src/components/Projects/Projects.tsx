import * as React from 'react';
import './projects.scss';
import { Button } from '@material-ui/core';
import ProjectsTable from './ProjectsTable';

const Projects: React.FC<any> = () => {
  return (
    <div className="projects">
      <Button variant="contained" color="primary">
        Add new project
      </Button>

      <ProjectsTable />
    </div>
  );
};

export default Projects;
