import React from "react";

import CounterCaaf from "../components/CounterCaaf";

export default {
  title: "Counter with Children as function",
};

export const CounterWithComponent = () => {
  return (
    <div>
        test
      <CounterCaaf>
        {({ counter, inc, dec }) => (
          <>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
            {counter}
          </>
        )}
      </CounterCaaf>
    </div>
  );
};

CounterWithComponent.story = {
  name: "component",
};
