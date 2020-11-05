import React, { useContext } from "react";

import { context } from "../hooks";
import { DecButton, IncButton } from "../../../components/Counter";

export const IncButtonWithCounter = () => {
  const { inc } = useContext(context);
  return <IncButton onClick={inc} />;
};

export const DecButtonWithCounter = () => {
  const { dec } = useContext(context);
  return <DecButton onClick={dec} />;
};
