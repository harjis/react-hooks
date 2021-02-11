import React, { useState, useCallback } from "react";
import { Story } from "@storybook/react";
import { useDocumentEventListener } from "../hooks/useDocumentEventListener";

export default {
  title: "useDocumentEventListener",
};

const UseEventListener = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handler = useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  useDocumentEventListener("abort", handler);

  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
};

const Template: Story = (args) => {
  return <UseEventListener />;
};

export const Basic = Template.bind({});
Basic.args = {};
