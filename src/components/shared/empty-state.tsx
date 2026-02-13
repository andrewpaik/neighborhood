import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
        <Icon className="h-8 w-8 text-sage-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-warmgray-900">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-warmgray-500">{description}</p>
      {action && (
        <Button
          asChild
          className="rounded-full bg-terracotta-500 px-6 font-semibold text-white hover:bg-terracotta-600"
        >
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
};
