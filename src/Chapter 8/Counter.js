import React, { useReducer } from 'react';
function reducer(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return { value: state.value + 1 };
    case 'DECREASE':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>현재 카운터 값 : {state.value}</p>
      <button onClick={() => dispatch({ type: 'INCREASE' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREASE' })}>-1</button>
    </div>
  );
};

export default Counter;
