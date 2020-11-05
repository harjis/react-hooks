import React from "react";
import { Story } from "@storybook/react";

import { useSnapshotStore } from "../hooks/useSnapshotStore";

export default {
  title: "SnapshotStore with counters",
};

const initialState = { counter: 0 };
export const App: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(true);
  const counters = Array.from({ length: 5 }, (x, i) => i);
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

      {isMounted &&
        counters.map((counter) => <Counter key={counter} id={counter} />)}
    </div>
  );
};

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

const Template: Story = (args) => {
  return <App />;
};

export const Basic = Template.bind({});
Basic.args = {};
