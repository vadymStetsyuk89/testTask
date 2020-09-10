import * as React from 'react';
import { Field } from 'formik';
import { TextField } from '@material-ui/core';

export interface IEntryProps {
  formik: any;
  fieldName: string;
  label: string;
  isRequired: boolean;
  isNumber?: boolean;
  step?: string;
  readOnly?: boolean;
  regExpString?: string;
}

export const Entry: React.FC<IEntryProps> = (props: IEntryProps) => {
  return (
    <Field name={props.fieldName}>
      {() => (
        <div className="form__group">
          <TextField
            type={props.isNumber ? 'number' : undefined}
            autoComplete={'off'}
            value={props.formik.values[props.fieldName]}
            className="form__group__field"
            required={props.isRequired}
            label={props.label}
            error={
              props.formik.errors[props.fieldName] &&
              props.formik.touched[props.fieldName]
            }
            onChange={(args: any) => {
              let isValid: boolean = true;
              const value = args?.target?.value ? args.target.value : '';

              if (isValid) {
                props.formik.setFieldValue(props.fieldName, value);
                props.formik.setFieldTouched(props.fieldName);
              }
            }}
            helperText={
              props.formik.errors[props.fieldName] &&
              props.formik.touched[props.fieldName]
                ? props.formik.errors[props.fieldName]
                : ''
            }
          />
        </div>
      )}
    </Field>
  );
};

export default Entry;
