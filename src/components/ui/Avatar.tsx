import { cn } from "../../utils/cn";

interface AvatarProps {
    name?: string | null;
    avatarUrl?: string | null;
    size?: "sm" | "md" | "lg";
    isBig?: boolean;
}

const AVATAR_COLORS = [
    "bg-primary",
    "bg-pink",
    "bg-warning",
    "bg-success",
    "bg-blue",
    "bg-gold",
    "bg-danger",
    "bg-primary-dark",
    "bg-cyan",
];

function getColorByName(name?: string | null) {
    if (!name) return "bg-primary";

    return AVATAR_COLORS[
        name.charCodeAt(0) % AVATAR_COLORS.length
    ];
}

const sizes = {
    sm: {
        wrapper: "w-8 h-8",
        text: "body",
    },
    md: {
        wrapper: "w-12 h-12",
        text: "h3",
    },
    lg: {
        wrapper: "w-24 h-24",
        text: "h2",
    },
};


export function Avatar({
    name,
    avatarUrl,
    size = "md",
    isBig = false,
}: AvatarProps) {

    const letter = name?.trim()?.[0]?.toUpperCase() ?? "?";

    const currentSize = isBig
        ? sizes.lg
        : sizes[size];


    return (
        <div
            className={cn(
                currentSize.wrapper,
                "rounded-full overflow-hidden flex items-center justify-center",
                getColorByName(name),
                {
                    "border-4 border-success shadow-lg": isBig,
                }
            )}
        >

            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={name ?? "avatar"}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span
                    className={cn(
                        currentSize.text,
                        "font-bold text-white"
                    )}
                >
                    {letter}
                </span>
            )}

        </div>
    );
}