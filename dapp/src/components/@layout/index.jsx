import { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useGraveyardStore } from '../../store'
import { useGetGraveyard } from '../../hooks/useGetGraves'
import Header from "./header"
import Footer from "./footer"


export default function MainLayout() {
    const shouldFetch = useRef(true)
    const setGraves = useGraveyardStore((state) => state.setGraves)
    const setTotalGraves = useGraveyardStore((state) => state.setTotalGraves)
    const setPage = useGraveyardStore((state) => state.setPage)
    const { getGraves, getGravesLoading, getGravesError } = useGetGraveyard()

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false
            getGraves().then((data) => {
                if (data && data[1]) {
                    setTotalGraves(parseInt(data[1].toString()))
                    setGraves(data[0])
                    setPage(2)
                }
            })
        }
    }, [])

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
