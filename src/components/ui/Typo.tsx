import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

const typoVariants = {
    h1: {
        tag: "h1",
        className: "h1 font-extrabold leading-tight",
    },
    h2: {
        tag: "h2",
        className: "text-h2 font-bold leading-tight",
    },
    h3: {
        tag: "h3",
        className: "text-h3 font-bold",
    },
    text: {
        tag: "p",
        className: "text-body font-normal leading-relaxed",
    },
    label: {
        tag: "span",
        className: "text-label font-semibold",
    },
} as const;


type Variant = keyof typeof typoVariants;


type Props = {
    variant?: Variant;
    className?: string;
    children?: ReactNode;
} & ComponentPropsWithoutRef<"span">;


export function Typo({
    variant = "text",
    className,
    children,
    ...props
}: Props) {

    const { tag: Tag, className: variantClass } = typoVariants[variant];


    return (
        <Tag
            className={cn(
                "text-text",
                variantClass,
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}