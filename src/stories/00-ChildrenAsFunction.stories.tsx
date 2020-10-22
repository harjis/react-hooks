import React from "react";

import Counter from "../components/Counter";

export default {
  title: "Counter with Children as function",
};

export const CounterWithComponent = () => {
  return (
    <div>
      <Counter>
        {({ counter, inc, dec }) => (
          <>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
            {counter}
          </>
        )}
      </Counter>
    </div>
  );
};

CounterWithComponent.story = {
  name: "component",
};
