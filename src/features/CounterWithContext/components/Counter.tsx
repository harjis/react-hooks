import React, { useContext } from "react";

import { context } from "../hooks";
import { Counter } from "../../../components/Counter";

export const CounterWithCounter = () => {
  const { counter } = useContext(context);
  return <Counter counter={counter} />;
};
