import { Button, Grid } from '@material-ui/core';
import * as React from 'react';

export interface IFormControlsState {
  onDismis: () => void;
  formik: any;
}

const FormControls: React.FC<IFormControlsState> = (
  props: IFormControlsState
) => {
  return (
    <Grid
      container
      justify="flex-end"
      style={{ marginTop: 24, marginBottom: 24 }}
    >
      <Grid container alignItems="stretch" item xs={3} spacing={3}>
        <Grid item xs={6}>
          <Button
            fullWidth
            onClick={() => props.onDismis()}
            variant="contained"
          >
            Dismis
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            onClick={() => props.formik.submitForm()}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormControls;
