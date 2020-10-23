import React, { useContext } from "react";
import { store } from "../../hooks/useCounterContext";

export const IncButton = () => {
  const { inc } = useContext(store);
  return <button onClick={inc}>+</button>;
};

export const DecButton = () => {
  const {dec} = useContext(store);
  return <button onClick={dec}>-</button>;
};
