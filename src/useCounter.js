import { useState, useEffect } from "react";

// share stateful logic,
// beware that every function component that use this custom hook
// share different state
const useCounter = initialCounter => {
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    console.log(`[Custom Hook] counter changed`);
  }, [counter]);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    // change the state by function
    setCounter(prevState => prevState - 1);

    // this will not work because on decrement triple function becase it's async
    // setCounter(counter - 1);
  };

  const decrementTriple = () => {
    decrement();
    decrement();
    decrement();
  };

  return [counter, increment, decrement, decrementTriple];
};

export default useCounter;
