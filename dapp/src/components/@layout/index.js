import { Outlet } from "react-router-dom"
import Header from "./header"

export default function MainLayout() {
    return (
        <div>
            <Header />
            <main className="container">
                <Outlet />
            </main>
        </div>
    )
}
