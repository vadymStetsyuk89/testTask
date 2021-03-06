import { TextField } from '@material-ui/core';
import { Field } from 'formik';
import * as React from 'react';

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
            variant="outlined"
            fullWidth
            inputProps={{ step: 0.01 }}
            type={props.isNumber ? 'number' : undefined}
            autoComplete={'off'}
            value={`${props.formik.values[props.fieldName]}`}
            required={props.isRequired}
            label={props.label}
            error={
              props.formik.errors[props.fieldName] &&
              props.formik.touched[props.fieldName]
            }
            onChange={(args: any) => {
              const value = args?.target?.value ? args.target.value : '';

              if (props.isNumber) {
                let parsedValue = parseFloat(value);

                if (isNaN(parsedValue)) parsedValue = 0;

                props.formik.setFieldValue(props.fieldName, parsedValue);
                props.formik.setFieldTouched(props.fieldName);
              } else {
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
