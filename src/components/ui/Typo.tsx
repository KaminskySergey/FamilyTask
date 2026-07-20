import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";

type Variant = "h1" | "h2" | "h3" | "body" | "label" | "points";

type TextElements = "h1" | "h2" | "h3" | "p" | "span";

const elementMap: Record<Variant, TextElements> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
    label: "span",
    points: "span",
};

const variantClasses: Record<Variant, string> = {
    h1: "text-h1 font-extrabold",
    h2: "text-h2 font-bold",
    h3: "text-h3 font-bold",
    body: "text-body font-normal",
    label: "text-label font-bold",
    points: "text-points font-bold",
};

type Props = ComponentPropsWithoutRef<"span"> & {
    variant?: Variant;
    className?: string;
    children?: ReactNode;
};

export function Typo({
    variant = "body",
    className,
    children,
    ...props
}: Props) {
    const Tag = elementMap[variant];

    return (
        <Tag className={cn("text-text", variantClasses[variant], className)} {...props}>
            {children}
        </Tag>
    );
}