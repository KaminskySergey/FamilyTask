import { format } from "date-fns";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultTab = "personal";
  const defaultDate = format(new Date(), "yyyy-MM-dd");

  const tab = searchParams.get("tab") ?? defaultTab;
  const date = searchParams.get("date") ?? defaultDate;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    let changed = false;

    if (!params.get("tab")) {
      params.set("tab", defaultTab);
      changed = true;
    }

    if (!params.get("date")) {
      params.set("date", defaultDate);
      changed = true;
    }

    if (changed) {
      setSearchParams(params, { replace: true });
    }
  }, []);

  function setTab(tab: string) {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);

    setSearchParams(params);
  }

  function setDate(date: string) {
    const params = new URLSearchParams(searchParams);
    params.set("date", date);

    setSearchParams(params);
  }

  return {
    tab,
    date,
    setTab,
    setDate,
  };
}
