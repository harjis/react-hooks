import React from "react";

type State = {
  x: number;
  y: number;
};
const initialState = { x: 0, y: 0 };

export default function useWindowPosition(): State {
  const [state, setState] = React.useState<State>(initialState);

  React.useEffect(() => {
    const onMove = (event: MouseEvent): void => {
      const coordinates = { x: event.clientX, y: event.clientY };
      setState(coordinates);
    };

    window.addEventListener("mousemove", onMove);
    return (): void => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return state;
}
