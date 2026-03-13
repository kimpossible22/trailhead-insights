import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground font-mono text-sm mb-2">Something went wrong loading this page.</p>
          <button
            className="text-primary hover:underline font-mono text-sm"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
