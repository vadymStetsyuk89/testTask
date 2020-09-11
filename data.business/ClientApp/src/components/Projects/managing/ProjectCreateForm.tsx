import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject, IProjectFormValues } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import FormLayout from './FormLayout';
import { Container, Button, Grid } from '@material-ui/core';
import { dialogActions } from '../../../reducers/dialogSlice';
import { assignPendingActions } from '../../../helpers/action.helper';
import { projectActions } from '../../../reducers/projectSlice';
import { IProjectEditFormState } from './ProjectEditForm';
import FormControls from './FormControls';

export interface IProjectCreateFormState {}

const buildPayload = (values: IProjectFormValues) => {
  let payload: Prdoject = {
    name: values.name,
    customerName: values.customerName,
    rate: values.rate,
    timings: values.workingTiming,
    description: '',
    id: 0,
    isDeleted: false,
  };

  return payload;
};

const initDefaultValues = () => {
  const initValues: IProjectFormValues = {
    name: '',
    customerName: '',
    rate: 0,
    workingTiming: [],
  };

  return initValues;
};

const ProjectCreateForm: React.FC<IProjectCreateFormState> = (
  props: IProjectCreateFormState
) => {
  const dispatch = useDispatch();

  const onDismis = () => {
    dispatch(dialogActions.closeDialog());
    dispatch(projectActions.changeTargetProject(null));
  };

  const onCreate = (values: IProjectFormValues) => {
    const payload = buildPayload(values);

    dispatch(
      assignPendingActions(
        projectActions.apiAddNewProject(payload),
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
          workingTiming: Yup.array(),
        })}
        initialValues={initDefaultValues()}
        onSubmit={(values: any) => {
          onCreate(values);
        }}
        innerRef={(formik: any) => {}}
        validateOnBlur={false}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <Container>
                <FormLayout formik={formik} />

                <FormControls formik={formik} onDismis={onDismis} />
              </Container>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProjectCreateForm;
