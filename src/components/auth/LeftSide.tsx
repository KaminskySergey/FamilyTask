import { Rocket } from "lucide-react";

export function LeftSide() {
    return (
        <section className="hidden md:flex md:w-6/12 lg:w-7/12 relative flex-col justify-center items-center p-12 bg-primary overflow-hidden">

            {/* Atmospheric Background Shader */}
            <div className="relative z-10 w-full max-w-xl">

                <div className="absolute -top-24 -left-20 w-64 h-64 bg-primary-light rounded-full blur-3xl opacity-30 animate-pulse"></div>

                <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-pink rounded-full blur-3xl opacity-20 animate-pulse delay-2000"></div>

                <div className="space-y-8 text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary-dark font-semibold text-sm shadow-lg rotate-2 translate-x-0 translate-y-0">

                        <span className="text-h3  text-gold [font-variation-settings:'FILL'_1,'wght'_600]">
                            star
                        </span>

                        Level Up Your Home Life
                    </div>

                    <h2 className="text-h2 font-extrabold text-white">
                        Family isn't just a team, it's the{" "}
                        <span className="text-h2 text-gold">
                            ultimate quest.
                        </span>
                    </h2>

                    <p className="text-body font-bold leading-relaxed max-w-md mx-auto text-primary-light">
                        Orchestrate daily tasks, celebrate tiny victories, and turn domestic
                        logistics into a shared adventure everyone wants to play.
                    </p>

                    <div className="mt-12 rounded-xl overflow-hidden border-4 border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            className="w-full aspect-video object-cover"
                            alt="Family teamwork illustration"
                            src="/public/auth.webp"
                        />
                    </div>

                </div>
            </div>

            {/* Branding */}
            <div className="absolute top-10 left-12 flex items-center gap-2">
                <Rocket className="text-white" />

                <div className="text-2xl font-black text-white tracking-tighter">
                    FamilyTask
                </div>
            </div>

        </section>
    );
}