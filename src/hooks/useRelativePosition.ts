import React from "react";

type State = {
  x: number;
  y: number;
};
const initialState = { x: 0, y: 0 };

type ReturnType = { state: State; onMove: (event: React.MouseEvent) => void };
export default function useRelativePosition(): ReturnType {
  const [state, setState] = React.useState<State>(initialState);

  const onMove = (event: React.MouseEvent): void => {
    const coordinates = getRelativePosition(event);
    if (coordinates !== null) setState(coordinates);
  };

  return { state, onMove };
}

function getRelativePosition(event: React.MouseEvent) {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
