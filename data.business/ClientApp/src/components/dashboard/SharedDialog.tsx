import * as React from 'react';
import { DialogTitle, Dialog } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../reducers/rootReducer';
import { IDialogProps } from '../../reducers/dialogSlice';
import { useLocation } from 'react-router';

interface ISharedDialogProps {}

export const SharedDialog: React.FC<ISharedDialogProps> = (
  props: ISharedDialogProps
) => {
  const location = useLocation();

  const dialogProps: IDialogProps = useSelector<
    IApplicationState,
    IDialogProps
  >((state) => state.dialog.dialogProps);

  const isOpen: boolean = useSelector<IApplicationState, boolean>(
    (state) => state.dialog.isOpen
  );

  const maxWidth: any = dialogProps ? dialogProps.maxWidth : 'md';

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={maxWidth}
        aria-labelledby="simple-dialog-title"
        open={isOpen}
      >
        <DialogTitle id="simple-dialog-title">{dialogProps.title}</DialogTitle>
        {isOpen && dialogProps?.component ? (
          <div>
            <dialogProps.component />
          </div>
        ) : null}
      </Dialog>
    </>
  );
};
