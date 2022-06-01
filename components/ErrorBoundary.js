import { Component } from "react"

// https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
			return (
				<div className="p-4">
          <h2>Oops, there is an error!</h2>

          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>

				</div>
			);
    }

    return this.props.children; 
  }
}

export default ErrorBoundary