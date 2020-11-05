import React from "react";

import { CounterProvider } from "../features/CounterWithContext/hooks";
import {
  CounterWithCounter,
  DecButtonWithCounter,
  IncButtonWithCounter,
} from "../features/CounterWithContext/components";

export default {
  title: "Counter hook using context",
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
