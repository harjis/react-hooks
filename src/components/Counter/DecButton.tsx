import React from "react";

type Props = {
  onClick: () => void;
};
export const DecButton: React.FC<Props> = (props) => {
  return <button onClick={props.onClick}>-</button>;
};
