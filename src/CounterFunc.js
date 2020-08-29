import React, { useState, useEffect } from "react";
import ChatAPI from "./ChatAPI";
import useCounter from "./useCounter";

function Counter(props) {
  // custom hook
  const [counter, increment] = useCounter(0);
  const [preferences, setPreferences] = useState({
    theme: "light",
    font: 12
  });

  const toggleTheme = () =>
    setPreferences({
      ...preferences, // remember to do this because state hook is replacing whole thing
      theme: preferences.theme === "light" ? "dark" : "light"
    });

  // componentDidMount and componentDidUpdate combined ~ do something after re?render
  // one thing to note that this effect has no dependency hence it will run every rerender
  useEffect(() => console.log("[Function component] did mount/update"));

  useEffect(() => {
    ChatAPI.subscribe(props.friendId, id => {
      console.log(`[Function component] subscribe to ChatAPI`);
      console.log(`[Function component] listen status of friend-${id}`);
    });
    // this function will be called when the component is about to unmount
    return () => {
      ChatAPI.unsubscribe(props.friendId, id => {
        console.log(
          `[Function component] stop listen to status of friend-${id}`
        );
        console.log(`[Function component] unsubscribe to ChatAPI`);
      });
    };
  }, [props.friendId]);
  // that thing inside bracket (called `dependencies`) makes the effect above only run when friendId props changed
  // when we have multiple dependencies, the effect will be called even if one of them changed

  useEffect(() => {
    console.log("[Function component] component did mount");
    // add cleanup function so this effect is also called when this component is about to unmount
    return () => {
      console.log("[Function component] component will unmount");
    };
  }, []);
  // that empty dependency make this effect only run one time when the component mounted
  // it makes the effect act like componentDidMount or componentWillUnmount on class component

  return (
    <div
      className="counter-box"
      style={{ background: preferences.theme === "light" ? "white" : "black" }}
    >
      <h4
        style={{
          color: preferences.theme === "light" ? "black" : "white"
        }}
      >
        Func. Component
      </h4>
      <p
        style={{
          fontSize: preferences.font,
          color: preferences.theme === "light" ? "black" : "white"
        }}
      >
        Counter :{counter}
      </p>
      <button onClick={increment}>Increment</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default Counter;
