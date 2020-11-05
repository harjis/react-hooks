import React from "react";

type Props = {
  counter: number;
};
export const Counter: React.FC<Props> = (props) => {
  return <>{props.counter}</>;
};
