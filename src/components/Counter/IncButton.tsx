import React from "react";

type Props = {
  onClick: () => void;
};
export const IncButton: React.FC<Props> = (props) => {
  return <button onClick={props.onClick}>+</button>;
};
