import { LoginForm } from "../../components/auth/LoginForm";
import { Container } from "../../components/ui/Container";

export default function LoginPage() {
    return (
        <Container className="flex flex-col gap-6 p-0 md:p-0">
            <h1 className=" text-center h1">Welcome back</h1>
            <LoginForm />
        </Container>
    )
}