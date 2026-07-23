import { cn } from "../../utils/cn";

type BoxProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  export function Box({ children, className }: BoxProps) {
    return (
      <div
        className={cn(
          "rounded-lg bg-white p-6 shadow-sm",
          className
        )}
      >
        {children}
      </div>
    );
  }