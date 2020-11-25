import React from "react";

import withCounter, { InjectedProps } from "../hocs/withCounter";

export default {
  title: "Counter with Hoc",
};

type OwnProps = {
  test: string;
};
const Counter = (props: OwnProps & InjectedProps) => {
  return (
    <div>
      {props.test}
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
      <CounterWithHoc test={""} />
    </div>
  );
};

CounterWithHocStory.story = {
  name: "hoc",
};
