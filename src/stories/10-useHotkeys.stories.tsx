import React from "react";
import { Story } from "@storybook/react";

import { useHotkeys, EventListener } from "../hooks/useHotkeys";
import { useEffectRef } from "../hooks/useEffectRef";

export default {
  title: "useHotkeys",
};

const eventListeners: EventListener[] = [
  {
    keys: ["a", "b"],
    eventListener: (event: KeyboardEvent) => {
      console.log(event);
    },
  },
];
export const Hotkeys: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(true);
  const ref = useHotkeys<HTMLDivElement>({ autoFocus: true, eventListeners });
  const refC = useEffectRef<HTMLDivElement>(ref);

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
          ref={refC}
        >
          hot
        </div>
      )}
    </div>
  );
};

const Template: Story = (args) => {
  return <Hotkeys />;
};

export const Basic = Template.bind({});
Basic.args = {};
