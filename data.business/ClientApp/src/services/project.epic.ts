import { postWebRequest, putWebRequest } from './../helpers/epic.helper';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/observable/empty';
import { projectActions } from '../reducers/projectSlice';
import { Store, AnyAction } from 'redux';
import 'rxjs-compat/add/observable/of';
import { ofType } from 'redux-observable';
import {
  flatMap,
  switchMap,
  catchError,
  mergeMap,
} from 'rxjs/internal/operators';
import { getWebRequest, deleteWebRequest } from '../helpers/epic.helper';
import * as API from '../constants/api.constants';
import {
  successCommonEpicFlow,
  errorCommonEpicFlow,
} from '../helpers/action.helper';
import { Prdoject } from '../model/project/prdoject';
import Projects from '../components/Projects/Projects';
import { List } from 'linq-typescript';

export const apiGetAllFabricsEpic = (action$: AnyAction, state$: any) => {
  return action$.pipe(
    ofType(projectActions.apiGetAllProjects.type),
    switchMap((action: AnyAction) => {
      return getWebRequest(API.GET_ALL_PROJECTS, state$.value).pipe(
        mergeMap((successResponse: any) => {
          return successCommonEpicFlow(successResponse, [], action);
        }),
        catchError((errorResponse: any) => {
          let projectstubP: Prdoject[] = [];

          for (let i = 1; i < 10; i++) {
            let projectNew = new Prdoject();
            projectNew.name = `Name ${i}`;
            projectNew.customerName = `Customer Name ${i}`;
            projectNew.rate = i + 10;
            projectNew.id = i;

            projectstubP.push(projectNew);
          }
          return errorCommonEpicFlow(
            projectstubP,
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
          key: 'id',
          value: `${action.payload}`,
        },
      ]).pipe(
        mergeMap((successResponse: any) => {
          return successCommonEpicFlow(successResponse, [], action);
        }),
        catchError((errorResponse: any) => {
          let pseudoResult = new List<Prdoject>(state$.value.project.projects)
            .where((project) => project.id !== action.payload)
            .toArray();

          return errorCommonEpicFlow(
            pseudoResult,
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
          let pseudoResult = new List<Prdoject>(state$.value.project.projects)
            .select((project) => {
              if (project.id === action.payload.id) return action.payload;
              else return project;
            })
            .toArray();

          return errorCommonEpicFlow(
            pseudoResult,
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
          let pseudoResult = new List<Prdoject>(
            state$.value.project.projects.map((item) => ({
              ...item,
            }))
          );
          pseudoResult.push(action.payload);

          return errorCommonEpicFlow(
            pseudoResult.toArray(),
            [{ type: 'ERROR_CREATE_PROJECT' }],
            action
          );
        })
      );
    })
  );
};
