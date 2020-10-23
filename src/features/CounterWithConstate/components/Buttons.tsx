import React from "react";

import { DecButton, IncButton } from "../../../components/Counter";
import { useCounterContext } from "../hooks";

export const IncButtonWithCounter = () => {
  const { inc } = useCounterContext();
  return <IncButton onClick={inc} />;
};

export const DecButtonWithCounter = () => {
  const { dec } = useCounterContext();
  return <DecButton onClick={dec} />;
};
