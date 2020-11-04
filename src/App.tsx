import React from "react";

import { useSnapshotStore } from "./hooks/useSnapshotStore";

const initialState = { counter: 0 };
const App: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(true);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setIsMounted((prevState) => !prevState);
          }}
        >
          {isMounted ? "Click to unmount" : "Click to mount"}
        </button>
      </div>
      {isMounted && <Counter id={1} />}
      {isMounted && <Counter id={2} />}
    </div>
  );
};

export default App;

function Counter(props: { id: number }) {
  const { save, remove, state } = useSnapshotStore({
    initialState,
    localStorageKey: "my-storage-" + props.id,
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
        <button onClick={() => save(counter)}>Save to store</button>
        <button onClick={() => remove()}>Remove from store</button>
      </div>
      <div>
        counter: {counter.counter} persistedState: {state.counter}
      </div>
    </div>
  );
}
