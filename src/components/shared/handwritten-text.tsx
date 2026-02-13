import { cn } from "@/lib/utils";

interface HandwrittenTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
}

export const HandwrittenText = ({
  children,
  className,
  as: Tag = "span",
}: HandwrittenTextProps) => {
  return <Tag className={cn("font-accent", className)}>{children}</Tag>;
};
