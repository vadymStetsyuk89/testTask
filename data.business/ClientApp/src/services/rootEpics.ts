import { combineEpics } from 'redux-observable';
import * as projectEpic from './project.epic';

const epicsArray = [...(Object as any).values(projectEpic)];

export const epics = combineEpics(...epicsArray);
