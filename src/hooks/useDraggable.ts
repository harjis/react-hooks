import React, { useCallback, useState } from "react";

import { useWindowEventListener } from "./useWindowEventListener";

type Coordinates = {
  x: number;
  y: number;
};
type Props = {
  coordinates: Coordinates;
  onDrag?: (coordinates: Coordinates) => void;
  onStopDrag?: (coordinates: Coordinates) => void;
};
type Return = {
  coordinates: Coordinates;
  startDrag: (event: React.MouseEvent) => void;
  stopDrag: () => void;
};
export const useDraggable = (props: Props): Return => {
  const [coordinates, setCoordinates] = useState<Coordinates>(
    props.coordinates
  );
  const [nodeOffset, setNodeOffset] = useState<Coordinates | null>(null);

  const startDrag = useCallback((event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    setNodeOffset({ x: pageX, y: pageY });
  }, []);

  const stopDrag = useCallback(() => {
    setNodeOffset(null);
  }, []);

  const drag = useCallback(
    (event: MouseEvent) => {
      if (nodeOffset === null) {
        return;
      }
      const xDiff = nodeOffset.x - event.pageX;
      const yDiff = nodeOffset.y - event.pageY;
      setNodeOffset({ x: event.pageX, y: event.pageY });
      setCoordinates((prevPosition) => {
        const newPosition = {
          x: prevPosition.x - xDiff,
          y: prevPosition.y - yDiff,
        };
        props.onDrag && props.onDrag(newPosition);
        return newPosition;
      });
    },
    [nodeOffset, props]
  );

  useWindowEventListener("mousemove", drag);

  return {
    coordinates,
    startDrag,
    stopDrag,
  };
};
