import { createSlice } from '@reduxjs/toolkit';
import { Prdoject } from '../model/project/prdoject';

const defaultDialogProps = () => {
  return {
    title: '',
    component: null,
    description: '',
    maxWidth: 'md',
  };
};

export class IDialogSliceState {
  isOpen: boolean;
  dialogProps: IDialogProps;
}

const defaultState: IDialogSliceState = {
  isOpen: false,
  dialogProps: defaultDialogProps(),
};

export interface IDialogProps {
  title: string;
  component: any;
  description?: string;
  maxWidth: string;
}

const dialog = createSlice({
  name: 'dialog',
  initialState: defaultState,

  reducers: {
    openDialog(state, action: { type: string; payload: IDialogProps }) {
      state.dialogProps = {
        ...state.dialogProps,
        title: action.payload.title,
        description: action.payload.description,
        component: action.payload.component,
        maxWidth: action.payload.maxWidth,
      };

      state.isOpen = true;
      return state;
    },
    closeDialog(state, action: { type: string; payload: IDialogProps }) {
      state.dialogProps = defaultDialogProps();
      state.isOpen = false;

      return state;
    },
  },
});

export const dialogActions = dialog.actions;
export default dialog.reducer;
