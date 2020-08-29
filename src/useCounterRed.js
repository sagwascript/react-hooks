import { useEffect, useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { counter: state.counter + 1 };
    case "decrement":
      return { counter: state.counter - 1 };
    default:
      return new Error();
  }
};

function useCounterRed(initialState) {
  const [state, dispatch] = useReducer(counterReducer, {
    counter: initialState
  });

  const increment = () => dispatch({ type: "increment" });
  const decrement = () => dispatch({ type: "decrement" });
  const tripleIncrement = () => {
    dispatch({ type: "increment" });
    dispatch({ type: "increment" });
    dispatch({ type: "increment" });
  };

  useEffect(() => {
    console.log(`[Counter Reducer Hook] counter changed.`);
  }, [state.counter]);

  return [state.counter, increment, decrement, tripleIncrement];
}

export default useCounterRed;
