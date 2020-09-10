import { createSlice } from '@reduxjs/toolkit';
import { Prdoject } from '../model/project/prdoject';

export class IProjectSliceState {
  projects: Prdoject[];
  targetProject: Prdoject;
}

const defaultState: IProjectSliceState = {
  projects: [],
  targetProject: null,
};

const project = createSlice({
  name: 'project',
  initialState: defaultState,

  reducers: {
    apiGetAllProjects(state) {},
    apiAddNewProject(state, action: { type: string; payload: Prdoject }) {},
    apiUpdateProject(state, action: { type: string; payload: Prdoject }) {},
    apiDeleteProjectById(state, action: { type: string; payload: number }) {},
    setProjectList(state, action: { type: string; payload: Prdoject[] }) {
      state.projects = action.payload;
      return state;
    },
    changeTargetProject(state, action: { type: string; payload: Prdoject }) {
      state.targetProject = action.payload;
      return state;
    },
  },
});

export const projectActions = project.actions;
export default project.reducer;
