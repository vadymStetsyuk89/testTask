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

export const apiGetAllFabricsEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectActions.apiGetAllProjects.type),
    switchMap((action: AnyAction) => {
      return getWebRequest(API.GET_ALL_PROJECTS, state$.value).pipe(
        mergeMap((successResponse: any) => {
          return successCommonEpicFlow(successResponse, [], action);
        }),
        catchError((errorResponse: any) => {
          // let projectstubP: Prdoject[] = [];

          // for (let i = 1; i < 10; i++) {
          //   let projectNew = new Prdoject();
          //   projectNew.name = `Name ${i}`;
          //   projectNew.customerName = `Customer Name ${i}`;
          //   projectNew.rate = i + 10;
          //   projectNew.id = i;

          //   projectstubP.push(projectNew);
          // }
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
          // let pseudoResult = new List<Prdoject>(state$.value.project.projects)
          //   .select((project) => {
          //     let result: Prdoject;

          //     if (project.id === action.payload.id) {
          //       result = { ...action.payload, timings: action.payload.timings };
          //     } else result = { ...project };

          //     result.timings = new List<WorkingTime>(result.timings)
          //       .select((timing) => {
          //         return { ...timing };
          //       })
          //       .where((timing) => !timing.isDeleted)
          //       .toArray();

          //     return result;
          //   })
          //   .where((project) => !project.isDeleted)
          //   .toArray();

          // pseudoResult.forEach((project, projectIndex) => {
          //   project.id = projectIndex + 1;

          //   project.timings.forEach((timing, index) => {
          //     timing.id = index + 1;
          //   });
          // });

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
          // let pseudoResult = new List<Prdoject>(
          //   state$.value.project.projects.map((item) => ({
          //     ...item,
          //   }))
          // );
          // pseudoResult.push(action.payload);
          // pseudoResult.forEach((project, projectIndex) => {
          //   project.id = projectIndex + 1;

          //   project.timings.forEach((timing, index) => {
          //     timing.id = index + 1;
          //   });
          // });

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
