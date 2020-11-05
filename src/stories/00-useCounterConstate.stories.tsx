import React from "react";

import {
  CounterProvider,
  CounterWithCounter,
  DecButtonWithCounter,
  IncButtonWithCounter,
} from "../features/CounterWithConstate";

export default {
  title: "Counter hook using constate",
};

export const CounterWithHook = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", width: 300 }}
    >
      <div>
        <CounterProvider>
          <IncButtonWithCounter />
          <DecButtonWithCounter />
          <CounterWithCounter />
        </CounterProvider>
      </div>

      <div>
        <CounterProvider>
          <IncButtonWithCounter />
          <DecButtonWithCounter />
          <CounterWithCounter />
        </CounterProvider>
      </div>
    </div>
  );
};

CounterWithHook.story = {
  name: "useCounter",
};
