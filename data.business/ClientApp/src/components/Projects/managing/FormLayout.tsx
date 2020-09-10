import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Prdoject } from '../../../model/project/prdoject';
import { IApplicationState } from '../../../reducers/rootReducer';
import { TextField } from '@material-ui/core';
import Entry from './Entry';

export interface IFormLayoutState {
  formik: any;
}

const FormLayout: React.FC<IFormLayoutState> = (props: IFormLayoutState) => {
  return (
    <div>
      <Entry
        formik={props.formik}
        fieldName={'name'}
        label={'Project Name'}
        isRequired={true}
      />

      <Entry
        formik={props.formik}
        fieldName={'customerName'}
        label={'Customer Name'}
        isRequired={true}
      />

      <Entry
        formik={props.formik}
        fieldName={'rate'}
        label={'Rate'}
        isNumber={true}
        isRequired={true}
      />
    </div>
  );
};

export default FormLayout;
