// Since this is reusable infrastructure (not something tied to one specific demo), it makes sense as its own file rather than embedded in the demo
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-md border border-red-400 bg-red-50 text-red-700 text-sm">
          Something went wrong. (Caught by ErrorBoundary — the app didn't crash.)
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
/**
 * One important thing to check while testing: open your browser DevTools console — you'll see the actual error
 * logged there (via componentDidCatch), proving the error genuinely happened and was caught, not silently swallowed.
 */