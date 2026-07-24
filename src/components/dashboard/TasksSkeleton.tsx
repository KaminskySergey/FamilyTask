import { Box } from "../ui/Box";

export function TasksSkeleton() {
    return (
        <Box>
            <h2 className="h2 mb-5">
                Daily Plan
            </h2>

            <ul className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index}
                        className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        gap-4
                        p-4
                        rounded-3xl
                        sm:rounded-full
                        border
                        border-border
                        bg-white
                        animate-pulse
                    "
                    >
                        {/* checkbox + priority */}
                        <div className="flex items-center gap-3 shrink-0 pl-1">

                            <div
                                className="
                                w-8
                                h-8
                                rounded-full
                                bg-light-blue
                            "
                            />

                            <div
                                className="
                                w-14
                                h-5
                                rounded-full
                                bg-light-blue
                            "
                            />

                        </div>


                        {/* content */}
                        <div
                            className="
                            flex-1
                            min-w-0
                            px-1
                            flex
                            flex-col
                            gap-2
                        "
                        >

                            <div
                                className="
                                h-5
                                w-1/2
                                rounded
                                bg-light-blue
                            "
                            />

                            <div
                                className="
                                h-5
                                w-32
                                rounded-full
                                bg-light-blue
                            "
                            />

                            <div
                                className="
                                h-4
                                w-3/4
                                rounded
                                bg-light-blue
                            "
                            />

                        </div>


                        {/* right */}
                        <div
                            className="
                            flex
                            items-center
                            gap-3
                            justify-between
                            sm:justify-end
                            shrink-0
                            pt-2
                            sm:pt-0
                            border-t
                            sm:border-none
                            border-border
                            pr-2
                        "
                        >

                            <div
                                className="
                                w-16
                                h-5
                                rounded-full
                                bg-light-blue
                            "
                            />

                            <div
                                className="
                                w-20
                                h-7
                                rounded-full
                                bg-light-blue
                            "
                            />

                        </div>

                    </li>
                ))}
            </ul>
        </Box>
    );
}