import React, { createContext } from "react";

import useCounter, { ReturnType } from "../../../hooks/useCounter";

const initialState: ReturnType = {
  counter: 0,
  inc: () => {
    throw new Error("Implement inc");
  },
  dec: () => {
    throw new Error("Implement dec");
  },
};

const context = createContext<ReturnType>(initialState);
const { Provider } = context;

const CounterProvider: React.FC = (props) => {
  const counter = useCounter();
  return <Provider value={counter}>{props.children}</Provider>;
};

export { context, CounterProvider };
