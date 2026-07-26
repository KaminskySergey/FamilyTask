import { format } from "date-fns";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import type { DashboardTab } from "../types/tab";
export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultTab: DashboardTab = "personal";
  const defaultDate = format(new Date(), "yyyy-MM-dd");

  const tab = (searchParams.get("tab") ?? defaultTab) as DashboardTab;

  const date = searchParams.get("date") ?? defaultDate;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    let changed = false;

    if (!params.has("tab")) {
      params.set("tab", defaultTab);
      changed = true;
    }

    if (!params.has("date")) {
      params.set("date", defaultDate);
      changed = true;
    }

    if (changed) {
      setSearchParams(params, {
        replace: true,
      });
    }
  }, []);

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
