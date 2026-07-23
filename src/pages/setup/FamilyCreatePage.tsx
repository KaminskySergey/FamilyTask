import { useNavigate } from "react-router";
import { Hero } from "../../components/ui/Hero";
import { useAuth } from "../../hooks/useAuth";
import { useCreateFamily } from "../../hooks/queries/useFamily";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createFamilySchema, type CreateFamilyForm } from "../../schemas/family.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFamilyError } from "../../utils/family-error";
import { Input } from "../../components/ui/Input";
import { Home, UserRoundPlus } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function FamilyCreatePage() {
    const navigate = useNavigate();

    const { user } = useAuth();
    const createFamily = useCreateFamily();

    const [error, setError] = useState<string | null>(null);


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateFamilyForm>({
        resolver: zodResolver(createFamilySchema),
        defaultValues: {
            name: "",
        },
    });



    async function handleCreateFamily(data: CreateFamilyForm) {

        if (!user) return;

        setError(null);

        try {

            await createFamily.mutateAsync({
                name: data.name.trim(),
                userId: user.id,
            });


            navigate("/");

        } catch (error: unknown) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";


            setError(getFamilyError(message));
        }
    }

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm space-y-6">
            <Hero
                title="Create Your Family"
                subtitle="Set up your family space and start your shared journey."
                icon={<UserRoundPlus
                    size={48}
                    className="text-white"
                />}
            />
            <form
                onSubmit={handleSubmit(handleCreateFamily)}
                className="space-y-6"
            >

                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <Input
                            label="Family name"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Example: Smith Family"
                            icon={<Home size={18} />}
                            error={errors.name?.message}
                        />
                    )}
                />


                {error && (
                    <div className="rounded-2xl bg-danger-bg p-4">
                        <p
                            className="text-danger body"
                        >
                            {error}
                        </p>
                    </div>
                )}


                <Button
                    type="submit"
                    className="w-full"
                    loading={createFamily.isPending}
                >
                    Create Family
                </Button>


            </form>
        </div>
    );
}