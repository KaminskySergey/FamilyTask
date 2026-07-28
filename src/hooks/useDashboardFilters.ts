import { format } from "date-fns";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import type { DashboardTab } from "../types/tab";


export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = (searchParams.get("tab") ?? "personal") as DashboardTab;
  const date = searchParams.get("date") ?? format(new Date(), "yyyy-MM-dd");

  const updateParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(key, value);
      return params;
    });
  };

  return {
    tab,
    date,
    setTab: (tab: string) => updateParam("tab", tab),
    setDate: (date: string) => updateParam("date", date),
  };
}