import React from "react";
import { Story } from "@storybook/react";

import { useDraggable } from "../hooks/useDraggable";

export default {
  title: "useDraggable",
};

type Rectangle = {
  id: number;
  x: number;
  y: number;
};
type Props = {
  rectangle: Rectangle;
};
const Rectangle: React.FC<Props> = (props) => {
  const { id, ...initialCoordinates } = props.rectangle;
  const { coordinates, startDrag } = useDraggable({
    coordinates: initialCoordinates,
  });
  return (
    <div
      style={{
        position: "absolute",
        cursor: "move",
        userSelect: "none",
        height: 100,
        width: 100,
        background: "white",
        border: "1px solid black",
        top: coordinates.y,
        left: coordinates.x,
      }}
      onMouseDown={startDrag}
    >
      Drag me!
    </div>
  );
};

const UseDraggable = () => {
  const rectangles: Rectangle[] = [
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 400, y: 500 },
  ];
  const [isMounted, setIsMounted] = React.useState(true);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "lightblue",
      }}
    >
      <button
        onClick={() => {
          setIsMounted(!isMounted);
        }}
      >
        Toggle mount
      </button>
      {isMounted &&
        rectangles.map((rectangle) => (
          <Rectangle key={rectangle.id} rectangle={rectangle} />
        ))}
    </div>
  );
};

const Template: Story = (args) => {
  return <UseDraggable />;
};

export const Basic = Template.bind({});
Basic.args = {};
