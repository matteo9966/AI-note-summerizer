import "./Skeleton.css";

interface SkeletonProps {
  rows?: number;
  className?: string;
  rowHeight?: number | string;
}

const Skeleton = ({ rows = 1, className = "", rowHeight }: SkeletonProps) => {
  return (
    <div class={`skeleton ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          class="skeleton-line"
          key={i}
          style={{
            height:
              typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight,
          }}
        />
      ))}
    </div>
  );
};

export default Skeleton;
