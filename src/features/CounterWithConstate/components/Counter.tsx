import React from "react";

import { Counter } from "../../../components/Counter";
import { useCounterContext } from "../hooks";

export const CounterWithCounter = () => {
  const { counter } = useCounterContext();
  return <Counter counter={counter} />;
};
