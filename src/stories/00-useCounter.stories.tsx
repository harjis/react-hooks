import React from "react";

import useCounter from "../hooks/useCounter";

export default {
  title: "Counter with hook"
};

export const CounterWithHook = () => {
  const { counter, inc, dec } = useCounter();
  return (
    <div>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
      {counter}
    </div>
  );
};

CounterWithHook.story = {
  name: "useCounter"
};
