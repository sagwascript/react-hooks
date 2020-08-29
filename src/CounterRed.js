import React from "react";
import useCounterRed from "./useCounterRed";

function CounterRed(props) {
  const [counter, increment, decrement, tripleIncrement] = useCounterRed(
    props.counter
  );

  return (
    <div className="counter-box">
      <h4>Counter using reducer</h4>
      <p>{counter}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={tripleIncrement}>Triple Increment</button>
    </div>
  );
}

export default CounterRed;
