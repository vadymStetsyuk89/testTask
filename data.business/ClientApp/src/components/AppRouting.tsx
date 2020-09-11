import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Dashboard } from './dashboard/DashBoard';
import PageNotFound from './PageNotFound';
import { APP_SEGMENT, NOT_FOUND } from '../constants/appRoutings.constants';

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
