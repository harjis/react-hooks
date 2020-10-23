import React from "react";

import { useCounterContext } from "../../hooks/useCounter";

export const Counter = () => {
  const { counter } = useCounterContext();
  return <>{counter}</>;
};
