import { cn } from "@lib/utils/cn";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-rspl-neutral-100", className)}
    />
  );
};

export default Skeleton;
