import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  
componentDidCatch(error: Error, errorInfo: ErrorInfo) {

  console.error("Uncaught error:", error, errorInfo);
  
  this.setState({ hasError: true });
}

render() {
  if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
  }

  return this.props.children;
}
}

export default ErrorBoundary;