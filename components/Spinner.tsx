export default function Spinner({
  size = 10,
  centered = false,
}: {
  size?: number;
  centered?: boolean;
}) {
  const pxSize = `${size * 4}px`;

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        centered
          ? "flex items-center justify-center w-full h-full"
          : "inline-flex items-center"
      }
    >
      <svg
        className="animate-spin"
        style={{ width: pxSize, height: pxSize }}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          className="opacity-20"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M22 12a10 10 0 0 1-10 10"
          className="opacity-100"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
