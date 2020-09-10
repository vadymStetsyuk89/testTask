import * as React from 'react';
// @ts-ignore
import { useDispatch, useSelector, connect } from 'react-redux';
import { actions, namedActions, State } from './reducers/projectSlice';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';

const mapDispatch = { increment: actions.increment };

export const TestComponent = (props: any) => {
  const dispatch = useDispatch();

  const counter = useSelector<any, State>((state) => {
    return state.counter.counter;
  });

  const { exists, name } = useSelector<any, number, boolean, string>(
    (state) => {
      return {
        name: (state.counter as State).name,
        exists: (state.counter as State).isExists,
      };
    }
  );

  return (
    <div>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
};
// export default connect((state) => ({ counter: (state as any).counter
// }), mapDispatch)(TestComponent);
