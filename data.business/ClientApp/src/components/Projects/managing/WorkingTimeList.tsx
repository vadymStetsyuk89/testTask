import * as React from 'react';
import WorkingTimeItem from './WorkingTimeItem';

export interface IWorkingTimeListState {
  formik: any;
}

const WorkingTimeList: React.FC<IWorkingTimeListState> = (
  props: IWorkingTimeListState
) => {
  debugger;
  return (
    <>
      {props.formik.values.workingTiming.map((item, index: number) => {
        return (
          <WorkingTimeItem key={index} formik={props.formik} item={item} />
        );
      })}
    </>
  );
};

export default WorkingTimeList;
