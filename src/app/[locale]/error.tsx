"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold text-navy">
        Something went wrong
      </h1>
      <button type="button" onClick={reset} className="btn-yellow mt-8">
        Try again
      </button>
    </div>
  );
}
