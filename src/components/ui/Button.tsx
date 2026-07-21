import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "danger";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtonVariant;
}

export function Button({
  children,
  loading = false,
  disabled = false,
  variant = "primary",
  className,
  ...props
}: IButton) {
  const baseStyles =
    "flex items-center cursor-pointer justify-center gap-2 px-6 py-4 rounded-full transition-all duration-200 font-semibold";

  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary-dark",

    secondary:
      "bg-primary-light text-primary hover:opacity-80",

    danger:
      "bg-danger text-white hover:opacity-90",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}