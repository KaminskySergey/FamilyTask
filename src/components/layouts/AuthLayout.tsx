import { Link, Outlet } from "react-router";
import { LeftSide } from "../auth/LeftSide";
import { ArrowLeft } from "lucide-react";

export function AuthLayout() {
    return (
        <main className="min-h-screen bg-background flex">
            <LeftSide />

            <section className="relative w-full md:w-6/12 lg:w-5/12 flex items-center justify-center p-3 sm:p-8 lg:p-12">

                {/* Back button */}
                <Link
                    className="hidden md:flex absolute top-6 left-6 items-center gap-2 text-primary font-bold text-headline-md group"
                    to="/home"
                >
                    <ArrowLeft className="transition-transform group-hover:-translate-x-1" />

                    <span className="body font-bold">
                        Back to Home
                    </span>
                </Link>


                {/* Form */}
                <Outlet />

            </section>
        </main>
    )
}