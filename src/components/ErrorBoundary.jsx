import React from "react";
import { supabase } from "../supabaseClient";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  async componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // Log error details into Supabase
    try {
      await supabase.from("error_logs").insert([
        {
          message: error.message,
          stack: error.stack,
          component_stack: errorInfo.componentStack,
          created_at: new Date().toISOString()
        }
      ]);
    } catch (dbError) {
      console.error("Failed to log error to Supabase:", dbError);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReport = () => {
    const subject = encodeURIComponent("App Error Report");
    const body = encodeURIComponent(
      `An error occurred:\n\n${this.state.error?.message}\n\nPlease describe what you were doing when this happened.`
    );
    window.location.href = `mailto:support@example.com?subject=${subject}&body=${body}`;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            backgroundColor: "#1a1a1a",
            color: "#fff",
            padding: "2rem",
            textAlign: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2 style={{ color: "#ff4d4d", marginBottom: "1rem" }}>
            ✦ Something went wrong ✦
          </h2>
          <p style={{ marginBottom: "2rem", opacity: 0.85 }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold"
              }}
            >
              Reload Page
            </button>
            <button
              onClick={this.handleReport}
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #ff4d4d",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold"
              }}
            >
              Report Issue
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
