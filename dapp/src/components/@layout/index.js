import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Header from "./header"
import Footer from "./footer"

export default function MainLayout() {
    return (
        <>
            <Header />
            <main style={{ display: 'flex', justifyContent: 'center', height: 'calc(100vh - 69px)' }}>
                <Outlet />
            </main>
            <Footer />
            <Toaster
                toastOptions={{
                    style: {
                        borderRadius: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        background: "#20202d",
                        color: "#fff",
                        padding: "10px 15px",
                    },
                    success: {
                        icon: "✔️",
                    },
                    error: {
                        icon: "❌",
                    },
                    custom: {
                        icon: "⚠️",
                    },
                }}
            />
        </>
    )
}
