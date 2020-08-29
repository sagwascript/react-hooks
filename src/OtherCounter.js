import React from "react";
import useCounter from "./useCounter";

function OtherCounter(props) {
  const [counter, increment, decrement, decrementTriple] = useCounter(10);
  return (
    <div className="counter-box">
      <h4>Other Counter</h4>
      <p>{counter}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={decrementTriple}>Triple Decrement</button>
    </div>
  );
}

export default OtherCounter;
