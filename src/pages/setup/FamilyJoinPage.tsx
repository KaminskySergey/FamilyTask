import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useJoinFamily } from "../../hooks/queries/useFamily";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { type JoinFamilyForm, joinFamilySchema } from "../../schemas/family.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getJoinFamilyError } from "../../utils/family-error";
import { Input } from "../../components/ui/Input";
import { Hero } from "../../components/ui/Hero";
import { KeyRound } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function FamilyJoinPage() {
    const navigate = useNavigate();

    const { user } = useAuth();
    const joinFamily = useJoinFamily();

    const [error, setError] = useState<string | null>(null);


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<JoinFamilyForm>({
        resolver: zodResolver(joinFamilySchema),
        defaultValues: {
            code: "",
        },
    });



    async function handleJoinFamily(data: JoinFamilyForm) {

        if (!user) return;

        setError(null);


        try {

            await joinFamily.mutateAsync({
                code: data.code.trim().toUpperCase(),
                userId: user.id,
            });


            navigate("/dashboard");


        } catch (error: unknown) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";


            setError(getJoinFamilyError(message));
        }
    }

    return (
        <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">


            <Hero
                title="Join a Family"
                subtitle="Enter the invitation code from your family"
                icon={
                    <KeyRound
                        size={48}
                        className="text-white"
                    />
                }
            />



            <form
                onSubmit={handleSubmit(handleJoinFamily)}
                className="space-y-6"
            >

                <Controller
                    control={control}
                    name="code"
                    render={({ field }) => (
                        <Input
                            label="Family code"
                            value={field.value}
                            onChange={(e) =>
                                field.onChange(
                                    e.target.value.toUpperCase()
                                )
                            }
                            placeholder="_ _ _ _ _ _ _ _"
                            icon={
                                <KeyRound size={18} />
                            }
                            error={errors.code?.message}
                            maxLength={8}
                            autoComplete="off"
                        />
                    )}
                />



                <div className="rounded-xl border border-primary bg-primary-light p-4">

                    <p
                        className="text-center label text-primary"
                    >
                        💡 Ask your family member to send you the invitation code
                    </p>

                </div>



                {error && (

                    <div className="rounded-2xl bg-danger-bg p-4">

                        <p
                            className="text-danger body"
                        >
                            ⚠ {error}
                        </p>

                    </div>

                )}



                <Button
                    type="submit"
                    className="w-full"
                    loading={joinFamily.isPending}
                >
                    Join Family
                </Button>


            </form>


        </div>

    );
}