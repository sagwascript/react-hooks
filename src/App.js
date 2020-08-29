import React, { useState } from "react";
import "./App.css";
import CounterFunc from "./CounterFunc";
import CounterClass from "./CounterClass";
import OtherCounter from "./OtherCounter";
import CounterRed from "./CounterRed";

function App() {
  const [friendId, setFriendId] = useState(1);
  const [showCounterClass, setShowCounterClass] = useState(true);
  const [showCounterFunc, setShowCounterFunc] = useState(true);
  return (
    <div className="App">
      <button
        style={{ marginRight: 5 }}
        onClick={() => setShowCounterClass(!showCounterClass)}
      >
        Mount/Unmount Counter (Class Component)
      </button>
      <button onClick={() => setShowCounterFunc(!showCounterFunc)}>
        Mount/Unmount Counter (Func. Component)
      </button>
      <input
        type="text"
        value={friendId}
        onChange={({ target }) => setFriendId(target.value)}
      />
      {showCounterClass && <CounterClass friendId={friendId} />}
      {showCounterFunc && <CounterFunc friendId={friendId} />}
      <OtherCounter />
      <CounterRed counter={8} />
    </div>
  );
}

export default App;
