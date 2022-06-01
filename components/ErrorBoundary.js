import { Component } from "react"

// https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
		this.setState({
			error,
			errorInfo
		})
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
			return (
				<div className="p-4">
					<h1>Something went wrong.</h1>

					<pre>{JSON.stringify(this.state.error)}</pre>

					{this.state.errorInfo && (
						<pre>{JSON.stringify(this.state.errorInfo)}</pre>
					)}
				</div>
			);
    }

    return this.props.children; 
  }
}

export default ErrorBoundary