import React, { useEffect, useRef, useState } from "react";

import { Story } from "@storybook/react";

type Props = {
  changeWidth: (width: number) => void;
  forceUpdate: () => void;
  width: number;
};
const Test: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      console.log("width", ref.current.getBoundingClientRect().width);
    }
    return () => {
      console.log("Unmount");
    };
  }, [ref]);

  console.log("rendering");
  return (
    <div ref={ref} style={{ width: props.width, background: "red" }}>
      <button onClick={props.forceUpdate}>force update</button>
      <input
        type="text"
        value={props.width}
        onChange={(event) => {
          const value = parseInt(event.currentTarget.value);
          props.changeWidth(value);
        }}
      />
    </div>
  );
};

const Template: Story<Props> = (args) => {
  const [width, setWidth] = useState(100);
  const [, setForceUpdate] = useState(0);
  return (
    <Test
      {...args}
      changeWidth={setWidth}
      width={width}
      forceUpdate={() => setForceUpdate((prevState) => prevState + 1)}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {};

export default {
  title: "Test",
};
