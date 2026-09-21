export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse bg-line/60 ${className}`}
    />
  );
}