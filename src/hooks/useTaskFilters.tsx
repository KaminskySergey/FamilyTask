import { useSearchParams } from "react-router";

export function useTaskFilters() {
    const [searchParams, setSearchParams] = useSearchParams();


    const updateParam = (key: string, value?: string) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

            return params;
        });
    };


    return {
        tab: searchParams.get("tab") ?? "open",
        priority: searchParams.get("priority") ?? "",
        recurrence: searchParams.get("recurrence") ?? "",
        category: searchParams.get("category") ?? "",


        setTab: (value?: string) =>
            updateParam("tab", value),

        setPriority: (value?: string) =>
            updateParam("priority", value),

        setRecurrence: (value?: string) =>
            updateParam("recurrence", value),

        setCategory: (value?: string) =>
            updateParam("category", value),
    };
}