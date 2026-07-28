import { format } from "date-fns";
import { useSearchParams } from "react-router";

export function useDateFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const today = format(new Date(), "yyyy-MM-dd");

  const date = searchParams.get("date") ?? today;

  const setDate = (date: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("date", date);

      return params;
    });
  };

  return {
    date,
    setDate,
  };
}
