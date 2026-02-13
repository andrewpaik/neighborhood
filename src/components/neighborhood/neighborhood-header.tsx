import { HandwrittenText } from "@/components/shared/handwritten-text";

interface NeighborhoodHeaderProps {
  name: string;
}

export const NeighborhoodHeader = ({ name }: NeighborhoodHeaderProps) => {
  return (
    <div className="mb-6">
      <HandwrittenText className="text-base text-sage-500">
        your neighborhood
      </HandwrittenText>
      <h1 className="text-2xl font-bold text-warmgray-900">{name}</h1>
    </div>
  );
};
