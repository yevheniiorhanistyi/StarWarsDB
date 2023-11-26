import { Component } from "react";

import { Props, State } from "../../types/types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch() {
    this.setState({ hasError: true });
  }

  public render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorMessage />;
    }

    return children;
  }
}

export default ErrorBoundary;
