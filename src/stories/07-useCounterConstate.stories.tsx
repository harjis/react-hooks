import React from "react";

import { CounterProvider } from "../hooks/useCounter";
import {
  Counter,
  DecButton,
  IncButton,
} from "../components/CounterWithConstate";

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
