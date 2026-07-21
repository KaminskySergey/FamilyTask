import { Spinner } from "./Spinner";

export function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <Spinner />
        </div>
    );
}