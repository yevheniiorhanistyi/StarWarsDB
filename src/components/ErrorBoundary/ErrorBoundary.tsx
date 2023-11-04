import { Component, ErrorInfo } from 'react';

import { Props, State } from '../../types/types';

import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  public render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <h3 className={styles.error}>Something went wrong...</h3>;
    }

    return children;
  }
}

export default ErrorBoundary;
