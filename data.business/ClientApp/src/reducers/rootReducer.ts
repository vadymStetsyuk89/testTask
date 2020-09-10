import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { default as projectReducer, IProjectSliceState } from './projectSlice';
import { default as dialogReducer, IDialogSliceState } from './dialogSlice';

export interface IApplicationState {
  routing: RouterState;
  project: IProjectSliceState;
  dialog: IDialogSliceState;
}

export const reducers = combineReducers({
  routing: routerReducer,
  notifications: notifications,
  project: projectReducer,
  dialog: dialogReducer,
});
