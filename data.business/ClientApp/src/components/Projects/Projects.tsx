import * as React from 'react';
import './projects.scss';
import ProjectsTable from './ProjectsTable';

const Projects: React.FC<any> = () => {
  return (
    <div className="projects">
      <ProjectsTable />
    </div>
  );
};

export default Projects;
