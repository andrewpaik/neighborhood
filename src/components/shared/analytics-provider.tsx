"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    initAnalytics();
  }, []);
  return <>{children}</>;
};
