import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface UserAvatarProps {
  user: Pick<User, "displayName" | "photoURL">;
  size?: "sm" | "md" | "lg";
  showPresence?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
};

const presenceClasses = {
  sm: "h-2.5 w-2.5 bottom-0 right-0",
  md: "h-3 w-3 bottom-0.5 right-0.5",
  lg: "h-4 w-4 bottom-1 right-1",
};

const getInitials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return parts[0]?.[0] ?? "?";
};

const getFallbackUrl = (name: string) => {
  const seed = name.toLowerCase().replace(/\s/g, "");
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`;
};

export const UserAvatar = ({
  user,
  size = "md",
  showPresence = false,
  className,
}: UserAvatarProps) => {
  const photoSrc = user.photoURL || getFallbackUrl(user.displayName);

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar className={cn(sizeClasses[size], "border-2 border-warmgray-100")}>
        <AvatarImage src={photoSrc} alt={user.displayName} />
        <AvatarFallback className="bg-sage-100 text-sage-700 font-medium">
          {getInitials(user.displayName).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showPresence && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-white bg-green-500",
            presenceClasses[size]
          )}
        />
      )}
    </div>
  );
};
