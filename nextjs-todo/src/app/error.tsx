"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by Next.js boundary:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            color: "#dc3545",
            backgroundColor: "#f8d7da",
            border: "1px solid #dc3545",
            borderRadius: "8px",
            margin: "20px",
          }}
        >
          <h1 style={{ color: "#dc3545" }}>Oops! Something went wrong.</h1>
          <p>
            We're sorry, but there was an unexpected error. Please try refreshing
            the page or return to home.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
