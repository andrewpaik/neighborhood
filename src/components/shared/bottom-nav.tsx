"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Compass, MapPin, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    href: "/neighborhood",
    label: "Neighborhood",
    icon: Users,
    activeColor: "text-neighborhood",
  },
  {
    href: "/missions",
    label: "Missions",
    icon: Compass,
    activeColor: "text-mission",
  },
  {
    href: "/hangouts",
    label: "Hangouts",
    icon: MapPin,
    activeColor: "text-hangout",
  },
  {
    href: "/profile",
    label: "Profile",
    icon: UserCircle,
    activeColor: "text-warmgray-700",
  },
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-warmgray-200 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors",
                isActive ? tab.activeColor : "text-warmgray-400"
              )}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
