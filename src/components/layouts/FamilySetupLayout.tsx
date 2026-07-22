import { Outlet } from "react-router";
import { Container } from "../ui/Container";

export function FamilySetupLayout() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <section className="min-h-screen py-8 px-4 sm:px-6 flex items-center ">
                <Container className="w-full">

                    <Outlet />
                </Container>
            </section>
        </main>
    )
}