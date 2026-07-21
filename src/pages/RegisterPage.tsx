import { RegisterForm } from "../components/auth/RegisterForm";
import { Container } from "../components/ui/Container";

export default function RegisterPage() {
    return (
        <Container className="flex flex-col gap-6 p-0 md:p-0">
            <h1 className=" text-center text-h1">Create an account</h1>
            <RegisterForm />
        </Container>
    )
}