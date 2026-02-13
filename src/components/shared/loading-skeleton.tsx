import { Skeleton } from "@/components/ui/skeleton";

export const MemberGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-white p-3"
        >
          <Skeleton className="mb-2 h-16 w-16 rounded-full" />
          <Skeleton className="mb-1.5 h-3.5 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center px-6 py-12">
      <Skeleton className="mb-4 h-24 w-24 rounded-full" />
      <Skeleton className="mb-2 h-6 w-32" />
      <Skeleton className="mb-4 h-4 w-48" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
};
