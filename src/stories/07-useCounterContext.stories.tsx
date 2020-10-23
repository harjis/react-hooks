import React from "react";

import { CounterProvider } from "../hooks/useCounterContext";
import {
  Counter,
  DecButton,
  IncButton,
} from "../components/CounterWithContext";

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
          <IncButton />
          <DecButton />
          <Counter />
        </CounterProvider>
      </div>

      <div>
        <CounterProvider>
          <IncButton />
          <DecButton />
          <Counter />
        </CounterProvider>
      </div>
    </div>
  );
};

CounterWithHook.story = {
  name: "useCounter",
};
