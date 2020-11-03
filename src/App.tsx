import React from "react";

import { useSnapshotStore } from "./hooks/useSnapshotStore";

const initialState = { counter: 0 };
const App: React.FC = () => {
  const { onSetState, state } = useSnapshotStore({
    initialState,
    localStorageKey: "my-storage",
  });

  const [counter, setCounter] = React.useState(state);
  const inc = () =>
    setCounter((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));

  const dec = () =>
    setCounter((prevState) => ({
      ...prevState,
      counter: prevState.counter - 1,
    }));
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
        <button onClick={() => onSetState(counter)}>Save to store</button>
      </div>
      <div>
        counter: {counter.counter} persistedState: {state.counter}
      </div>
    </div>
  );
};

export default App;
