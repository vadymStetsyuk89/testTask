import { List } from 'linq-typescript';
import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import 'rxjs-compat/add/observable/empty';
import 'rxjs-compat/add/observable/of';
import { catchError, mergeMap, switchMap } from 'rxjs/internal/operators';
import * as API from '../constants/api.constants';
import {
  errorCommonEpicFlow,
  successCommonEpicFlow,
} from '../helpers/action.helper';
import { deleteWebRequest, getWebRequest } from '../helpers/epic.helper';
import { Prdoject, WorkingTime } from '../model/project/prdoject';
import { projectActions } from '../reducers/projectSlice';
import { postWebRequest, putWebRequest } from './../helpers/epic.helper';

export const apiGetAllProjectsEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectActions.apiGetAllProjects.type),
    switchMap((action: AnyAction) => {
      return getWebRequest(API.GET_ALL_PROJECTS, state$.value).pipe(
        mergeMap((successResponse: any) => {
          successResponse.forEach((project: Prdoject) => {
            if (project.workingTimes) {
              project.workingTimes.forEach((workingTime: WorkingTime) => {
                if (!workingTime.startedAt.getTime) {
                  workingTime.startedAt = new Date(workingTime.startedAt);
                }

                if (!workingTime.endedAt.getTime) {
                  workingTime.endedAt = new Date(workingTime.endedAt);
                }
              });
            }
          });

          return successCommonEpicFlow(successResponse, [], action);
        }),
        catchError((errorResponse: any) => {
          return errorCommonEpicFlow(
            errorResponse,
            [{ type: 'ERROR_GET_ALL_PROJECTS' }],
            action
          );
        })
      );
    })
  );
};

export const apiDeleteProjectByIdEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectActions.apiDeleteProjectById.type),
    switchMap((action: AnyAction) => {
      return deleteWebRequest(API.DELETE_PROJECT_BY_ID, state$.value, [
        {
          key: 'projectId',
          value: `${action.payload}`,
        },
      ]).pipe(
        mergeMap((successResponse: any) => {
          return successCommonEpicFlow(successResponse, [], action);
        }),
        catchError((errorResponse: any) => {
          // let pseudoResult = new List<Prdoject>(state$.value.project.projects)
          //   .where((project) => project.id !== action.payload)
          //   .toArray();

          return errorCommonEpicFlow(
            errorResponse,
            [{ type: 'ERROR_DELETE_PROJECT_BY_ID' }],
            action
          );
        })
      );
    })
  );
};

export const apiUpdateProjectEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectActions.apiUpdateProject.type),
    switchMap((action: AnyAction) => {
      return putWebRequest(
        API.UPDATE_PROJECT,
        action.payload,
        state$.value
      ).pipe(
        mergeMap((successResponse: any) => {
          return successCommonEpicFlow(successResponse, [], action);
        }),
        catchError((errorResponse: any) => {
          return errorCommonEpicFlow(
            errorResponse,
            [{ type: 'ERROR_UPDATE_PROJECT' }],
            action
          );
        })
      );
    })
  );
};

export const apiAddNewProjectEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectActions.apiAddNewProject.type),
    switchMap((action: AnyAction) => {
      return postWebRequest(
        API.ADD_NEW_PROJECT,
        action.payload,
        state$.value
      ).pipe(
        mergeMap((successResponse: any) => {
          return successCommonEpicFlow(successResponse, [], action);
        }),
        catchError((errorResponse: any) => {
          return errorCommonEpicFlow(
            errorResponse,
            [{ type: 'ERROR_CREATE_PROJECT' }],
            action
          );
        })
      );
    })
  );
};
