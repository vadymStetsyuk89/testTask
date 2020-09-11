import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Projects from '../Projects/Projects';
import './mainContent.scss';
import {
  APP_SEGMENT,
  PROJECTS_SEGMENT,
} from '../../constants/appRoutings.constants';

const MainContentRouting: React.FC<any> = () => {
  return (
    <div className="mainContent">
      <Switch>
        <Redirect
          exact
          from={`/${APP_SEGMENT}`}
          to={`/${APP_SEGMENT}/${PROJECTS_SEGMENT}`}
        />

        <Route
          path={`/${APP_SEGMENT}/${PROJECTS_SEGMENT}`}
          component={Projects}
        />
      </Switch>
    </div>
  );
};

export default MainContentRouting;
