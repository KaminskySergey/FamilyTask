import { cn } from "../../utils/cn";

type ToggleItem = {
    id: string;
    label: string;
    icon?: React.ReactNode;
  };
  
  type ToggleGroupProps = {
    items: ToggleItem[];
    active?: string;
    onChange?: (value: string) => void;
  };
  
  export default function ToggleGroup({
    items,
    active,
    onChange,
  }: ToggleGroupProps) {
    return (
        <div className="bg-light-blue  text-muted shadow-md rounded-full inline-flex p-1 gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onChange?.(item.id)}
              className={cn(
                "cursor-pointer h3 font-bold inline-flex items-center px-4 py-2 rounded-full transition-all duration-300 ease-in focus:outline-none",
                "",
                {
                  "bg-primary text-white shadow-sm": active === item.id,
                  "text-text hover:bg-primary/50": active !== item.id,
                }
              )}
            >
              {item.icon && (
                <span className="w-4 h-4 mr-2">
                  {item.icon}
                </span>
              )}
    
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      );
  }