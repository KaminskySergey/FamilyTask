import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
};

export function Input({
  label,
  error,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="ml-1 text-body font-medium text-text"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex h-14 items-center rounded-full border bg-white px-5 transition-colors",
          "border-border focus-within:border-primary",
          error && "border-danger",
        )}
      >
        {icon && (
          <div className="mr-3 text-muted">
            {icon}
          </div>
        )}

        <input
          id={id}
          className={cn(
            "flex-1 bg-transparent outline-none",
            "text-text placeholder:text-light",
            "font-sans text-body",
            className,
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="ml-4 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}