import React, { ErrorInfo } from "react";

type Props = {
  fallback: (error: string) => React.ReactNode;
};
type State = {
  hasError: boolean;
  error: string;
};
export class CommonErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: "" };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.log(error, errorInfo);
  }

  render() {
    return this.state.hasError
      ? this.props.fallback(this.state.error)
      : this.props.children;
  }
}
