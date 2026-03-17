
import './Skeleton.css'

interface SkeletonProps {
  rows?: number
  className?: string
}

const Skeleton = ({ rows = 1, className = '' }: SkeletonProps) => {
  return (
    <div class={`skeleton ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div class="skeleton-line" key={i} />
      ))}
    </div>
  )
}

export default Skeleton
