import React from "react";

export type InjectedProps = {
  counter: number;
  inc: () => void;
  dec: () => void;
};
type State = {
  counter: number;
};
const withCounter = <P extends InjectedProps>(
  Component: React.ComponentType<P>
) =>
  class WithCounterHoc extends React.Component<
    Omit<P, keyof InjectedProps>,
    State
  > {
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
      return (
        <Component
          {...(this.props as P)}
          counter={this.state.counter}
          inc={this.inc}
          dec={this.dec}
        />
      );
    }
  };
export default withCounter;
