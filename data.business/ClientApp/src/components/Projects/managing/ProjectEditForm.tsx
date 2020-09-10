import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import FormLayout from './FormLayout';
import { Container, Button } from '@material-ui/core';
import { dialogActions } from '../../../reducers/dialogSlice';
import { assignPendingActions } from '../../../helpers/action.helper';
import { projectActions } from '../../../reducers/projectSlice';

export interface IProjectEditFormState {}

export interface IFormValues {
  name: string;
  customerName: string;
  rate: number;
}

const buildPayload = (values: IFormValues, sourceEntity: Prdoject) => {
  let payload: Prdoject = {
    ...sourceEntity,
    name: values.name,
    customerName: values.customerName,
    rate: values.rate,
    timings: [],
  };

  return payload;
};

const initDefaultValues = (sourceEntity: Prdoject) => {
  const initValues: IFormValues = {
    name: sourceEntity.name,
    customerName: sourceEntity.customerName,
    rate: sourceEntity.rate,
  };

  return initValues;
};

const ProjectEditForm: React.FC<IProjectEditFormState> = (
  props: IProjectEditFormState
) => {
  const dispatch = useDispatch();

  const projectForEdit: Prdoject = useSelector<IApplicationState, Prdoject>(
    (state) => state.project.targetProject
  );

  const onDismis = () => {
    dispatch(dialogActions.closeDialog());
    dispatch(projectActions.changeTargetProject(null));
  };

  const onEdit = (values: IFormValues, project: Prdoject) => {
    const payload = buildPayload(values, project);

    dispatch(
      assignPendingActions(
        projectActions.apiUpdateProject(payload),
        [],
        [],
        (args: any) => {
          dispatch(projectActions.setProjectList(args));
          onDismis();
        },
        (args: any) => {
          dispatch(projectActions.setProjectList(args));
          onDismis();
        }
      )
    );
  };

  return (
    <div>
      <Container>
        <Formik
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required(() => 'Name is required')
              .min(3)
              .max(50),
            customerName: Yup.string()
              .required(() => 'Customer name is required')
              .min(3)
              .max(50),
            rate: Yup.number().min(0.01),
          })}
          initialValues={initDefaultValues(projectForEdit)}
          onSubmit={(values: any) => {
            debugger;
            onEdit(values, projectForEdit);
          }}
          innerRef={(formik: any) => {}}
          validateOnBlur={false}
          enableReinitialize={true}
        >
          {(formik) => {
            return (
              <Form>
                <FormLayout formik={formik} />

                <Button onClick={() => onDismis()} variant="contained">
                  Dismis
                </Button>
                <Button
                  onClick={() => formik.submitForm()}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
};

export default ProjectEditForm;
