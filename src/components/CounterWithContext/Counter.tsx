import React, { useContext } from "react";

import { store } from "../../hooks/useCounterContext";

export const Counter = () => {
  const { counter } = useContext(store);
  return <>{counter}</>;
};
