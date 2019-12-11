import React from "react";

import withCounter, { InjectedProps } from "../hocs/withCounter";

export default {
  title: "Counter with Hoc"
};

const Counter = (props: InjectedProps) => {
  return (
    <div>
      <button onClick={props.inc}>+</button>
      <button onClick={props.dec}>-</button>
      {props.counter}
    </div>
  );
};

const CounterWithHoc = withCounter(Counter);

export const CounterWithHocStory = () => {
  return (
    <div>
      <CounterWithHoc />
    </div>
  );
};

CounterWithHocStory.story = {
  name: "hoc"
};
