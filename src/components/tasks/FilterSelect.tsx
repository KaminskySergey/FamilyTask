import { cn } from "@/utils/cn";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState, type ReactNode } from "react";
import { X } from "lucide-react";

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
  onChange: (value?: T) => void;
}
export function FilterSelect<T extends string>({
  icon,
  placeholder,
  options,
  value,
  onChange,
}: FilterSelectProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Select
      value={value}
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => onChange(value as T)}
    >
      <SelectTrigger className="w-fit h-12 gap-3 h4 px-6 py-6 rounded-full bg-white text-text border-border hover:bg-light-blue focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer whitespace-nowrap">

        {icon}

        <SelectValue placeholder={placeholder} />

        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onChange(undefined);
              setOpen(false);
            }}
            className="ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-light-blue hover:text-text"
          >
            <X size={14} />
          </button>
        )}

      </SelectTrigger>

      <SelectContent className="z-10 rounded-2xl bg-white shadow-lg ring-border">
        <div className="p-2">
          {options.map((option) => (
            <SelectItem
              key={option.key}
              value={option.key}
              className="inline-flex h4 w-full cursor-pointer items-center rounded-2xl p-4 hover:bg-light-blue hover:text-text focus:bg-primary/10 focus:text-primary"
            >
              {option.icon && (
                <option.icon
                  className={cn(
                    "h-4 w-4",
                    option.color ?? "text-primary"
                  )}
                />
              )}

              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}


