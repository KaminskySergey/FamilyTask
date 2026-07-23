import { Hand } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { useAuth } from "../../hooks/useAuth";
import ToggleGroup from "../../components/ui/ToggleGroup";
import { taskTabs } from "../../constants/tabsTasks";
import { useProfile } from "../../hooks/queries/useProfile";
import { LevelCard } from "../../components/dashboard/LevelCard";
import { LevelCardSkeleton } from "../../components/dashboard/LevelCardSkeleton";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";
import { format } from "date-fns";

export default function DashboardPage() {
    const { user } = useAuth()
    if (!user) return null;
    const { tab, date, setTab } = useDashboardFilters();
    const { data: profile, isLoading } = useProfile(user.id)

    console.log(date)
    return (
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Header */}
            <section className="lg:col-span-12 rounded-2xl  p-6 ">
                <div className="flex items-center gap-2">
                    <Hand className="fill-gold w-10 h-10" />
                    <h1 className="h1-extra">
                        Dashboard
                    </h1>
                </div>

                <time
                    dateTime={date}
                    className="body text-gray-500"
                >
                    {format(new Date(date), "EEEE, dd MMMM")}
                </time>
                <h2 className="h2 my-3">Welcome, {user.user_metadata.name}!</h2>
                <ToggleGroup active={tab} onChange={setTab} items={taskTabs} />
            </section>

            {/* Left */}
            <section className="lg:col-span-8 space-y-6">

                {isLoading ? <LevelCardSkeleton /> : <LevelCard xp={profile.xp} />}

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    ...
                </div>

            </section>

            {/* Right */}
            <aside className="lg:col-span-4 space-y-6">

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    ...
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    ...
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    ...
                </div>

            </aside>

        </Container>
    )
}