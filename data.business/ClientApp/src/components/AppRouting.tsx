import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Dashboard } from './dashboard/DashBoard';
import PageNotFound from './PageNotFound';

export const APP_SEGMENT: string = 'app';
export const PROJECTS_SEGMENT: string = 'projects';
export const NOT_FOUND: string = 'not-found';

export const AppRouting: React.FC<any> = (props) => {
  return (
    <Switch>
      <Redirect exact from="/" to={`/${APP_SEGMENT}`} />

      <Route path={`/${APP_SEGMENT}`} component={Dashboard} />

      <Route path={`/${NOT_FOUND}`} component={PageNotFound} />

      <Redirect from="*" to={`/${NOT_FOUND}`} />
    </Switch>
  );
};

export default AppRouting;
