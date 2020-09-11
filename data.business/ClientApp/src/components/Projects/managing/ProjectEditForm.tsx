import { Container } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { assignPendingActions } from '../../../helpers/action.helper';
import { IProjectFormValues, Prdoject } from '../../../model/project/prdoject';
import { dialogActions } from '../../../reducers/dialogSlice';
import { projectActions } from '../../../reducers/projectSlice';
import { IApplicationState } from '../../../reducers/rootReducer';
import FormControls from './FormControls';
import FormLayout from './FormLayout';

export interface IProjectEditFormState {}

const buildPayload = (values: IProjectFormValues, sourceEntity: Prdoject) => {
  let payload: Prdoject = {
    ...sourceEntity,
    name: values.name,
    customerName: values.customerName,
    rate: values.rate,
    timings: [...values.workingTiming],
  };

  return payload;
};

const initDefaultValues = (sourceEntity: Prdoject) => {
  const initValues: IProjectFormValues = {
    name: sourceEntity.name,
    customerName: sourceEntity.customerName,
    rate: sourceEntity.rate,
    workingTiming: [...sourceEntity.timings],
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

  const onEdit = (values: IProjectFormValues, project: Prdoject) => {
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
            workingTiming: Yup.array(),
          })}
          initialValues={initDefaultValues(projectForEdit)}
          onSubmit={(values: any) => {
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

                <FormControls formik={formik} onDismis={onDismis} />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
};

export default ProjectEditForm;
