import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen justify-center items-center">
          <button className="bg-orange-400 text-white px-2 py-2 rounded">
            Something went wrong.
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
