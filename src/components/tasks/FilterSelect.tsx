import { cn } from "@/utils/cn";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { ReactNode } from "react";

interface FilterOption {
  key: string;
  label: string;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FilterSelectProps<T extends string> {
  icon?: ReactNode;
  placeholder: string;
  options: readonly FilterOption[];
  value?: T;
  onChange: (value: T) => void;
}


export function FilterSelect<T extends string>({
  icon,
  placeholder,
  options,
  value,
  onChange,
}: FilterSelectProps<T>) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-fit h-12 gap-3 h4 px-6 py-6  rounded-full bg-white text-text border-border hover:bg-light-blue focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer whitespace-nowrap">
        {icon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="z-10 bg-white ring-border rounded-2xl shadow-lg">
        <div className="p-2">
          {options.map((option) => (
            <SelectItem
              key={option.key}
              value={option.key}
              className="inline-flex h4  items-center w-full p-4 rounded-2xl cursor-pointer hover:bg-light-blue hover:text-text focus:bg-primary/10 focus:text-primary"
            >
              {option.icon && (
                <option.icon className={cn("w-4 h-4", option.color ?? "text-primary")} />
              )}
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}



