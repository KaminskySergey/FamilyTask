import { Outlet } from "react-router";

export function PublicLayout() {
    return (
        <div>
            <header>Публичный хедер / логотип / кнопка "Войти"</header>
            <h1 className="text-blue">fdvdfv</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
}