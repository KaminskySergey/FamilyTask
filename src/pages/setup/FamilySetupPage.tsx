import { Home, KeyRound, Users } from "lucide-react";
import { ActionFamilySetupCard } from "../../components/ui/ActionFamilySetupCard";
import { Hero } from "../../components/ui/Hero";
import { Divider } from "../../components/ui/Divider";

export default function FamilySetupPage() {
    return (
        <>
            <Hero
                title="Welcome to FamilySpace"
                subtitle="To get started, create a new family profile or enter an invitation code to join your loved ones."
                icon={<Home size={32} className="md:w-10 md:h-10" />}
            />

            <div className="flex flex-col mt-8 md:flex-row items-stretch justify-center gap-0 md:gap-8 relative">

                <ActionFamilySetupCard
                    variant="primary"
                    label="Create a Family"
                    description="Start a new adventure with your family"
                    icon={<Users size={32} />}
                    to="/create"
                />

                <Divider text="or" />

                <ActionFamilySetupCard
                    label="Join a Family"
                    description="Enter an invitation code to join an existing family"
                    icon={<KeyRound size={32} />}
                    to="/join"
                />

            </div>

        </>
    );
}