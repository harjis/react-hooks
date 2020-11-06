import React from "react";
import { Story } from "@storybook/react";

import { useHotkeys, EventListener } from "../hooks/useHotkeys";

export default {
  title: "useHotkeys",
};

const Hotkeys: React.FC = () => {
  const [keyPresses, setKeyPress] = React.useState<string[]>([]);
  const [isMounted, setIsMounted] = React.useState(true);
  const eventListeners: EventListener[] = [
    {
      keys: ["a", "b"],
      eventListener: (event: KeyboardEvent) => {
        setKeyPress((prevState) => prevState.concat(event.key));
      },
    },
  ];
  const ref = useHotkeys<HTMLDivElement>({ autoFocus: true, eventListeners });

  return (
    <div>
      <button
        onClick={() => {
          setIsMounted((prevState) => !prevState);
        }}
      >
        {isMounted ? "Click to unmount" : "Click to mount"}
      </button>
      {isMounted && (
        <div
          tabIndex={0}
          style={{ height: 100, width: 100, border: "1px solid black" }}
          ref={ref}
        >
          Press A or B
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {keyPresses.map((keyPress) => (
          <div>{`${keyPress.toUpperCase()} pressed!`}</div>
        ))}
      </div>
    </div>
  );
};

const Template: Story = (args) => {
  return <Hotkeys />;
};

export const Basic = Template.bind({});
Basic.args = {};
