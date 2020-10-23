import React from "react";

type ChildrenProps = {
  counter: number;
  inc: () => void;
  dec: () => void;
};
type Props = {
  children: (props: ChildrenProps) => React.ReactNode;
};
type State = {
  counter: number;
};
export default class CounterCaaf extends React.Component<Props, State> {
  state = {
    counter: 0,
  };

  inc = () =>
    this.setState((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));
  dec = () =>
    this.setState((prevState) => ({
      ...prevState,
      counter: prevState.counter - 1,
    }));

  render() {
    return this.props.children({
      counter: this.state.counter,
      inc: this.inc,
      dec: this.dec,
    });
  }
}
