import React from "react";

import { useCounterContext } from "../../hooks/useCounter";

export const IncButton = () => {
  const { inc } = useCounterContext();
  return <button onClick={inc}>+</button>;
};

export const DecButton = () => {
  const { dec } = useCounterContext();
  return <button onClick={dec}>-</button>;
};
