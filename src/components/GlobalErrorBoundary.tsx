import React, { Component, ReactNode, ErrorInfo } from "react";

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true, error });
    // Optional: log error to an external service
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
