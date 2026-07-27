"use client";

/**
 * Required once the root layout lives under [locale]: a crash in that layout
 * means no <html>/<body> has been rendered, so global-error must supply its own.
 *
 * Locale is unknowable here (the failure may precede locale resolution), so this
 * is the one place in the app that legitimately hardcodes English.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0e1f45",
          color: "#e8f1f8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f9e527",
            }}
          >
            AGGELOS Rentals
          </p>
          <h1
            style={{ margin: "0 0 1rem", fontSize: "1.75rem", lineHeight: 1.2 }}
          >
            Something went wrong
          </h1>
          <p style={{ margin: "0 0 1.75rem", opacity: 0.75, lineHeight: 1.6 }}>
            Sorry — this page failed to load. You can retry, or reach us
            directly and we&rsquo;ll sort your booking out.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                background: "#f9e527",
                color: "#112553",
                border: 0,
                borderRadius: "0.5rem",
                padding: "0.85rem 1.5rem",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="tel:+306944950094"
              style={{
                border: "1px solid rgba(255,255,255,0.45)",
                color: "#e8f1f8",
                borderRadius: "0.5rem",
                padding: "0.85rem 1.5rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              +30 694 495 0094
            </a>
          </div>
          {error.digest ? (
            <p style={{ marginTop: "2rem", fontSize: "0.75rem", opacity: 0.4 }}>
              Reference: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
