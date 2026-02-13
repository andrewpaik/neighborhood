interface NeighborhoodPulseProps {
  activeCount: number;
  totalCount: number;
}

export const NeighborhoodPulse = ({
  activeCount,
  totalCount,
}: NeighborhoodPulseProps) => {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sage-50 px-4 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <span className="text-sm text-warmgray-600">
        {activeCount} of {totalCount} neighbors active this week
      </span>
    </div>
  );
};
