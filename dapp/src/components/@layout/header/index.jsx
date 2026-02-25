import './index.css'
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'


export default function Header() {
    let location = useLocation()
    const [active, setActive] = useState("/")

    useEffect(() => {
        setActive(location.pathname)
    }, [location])

    return (
        <nav className="nav sticky">
            <div className="nav-inner">
                <div className="logo">NFT Cemetery</div>
                <div className="menuItems">
                    <Link to="/" className={active == "/" ? "linkActiveH" : ""}>Home</Link>
                    <Link to="/funeral" className={active == "/funeral" ? "linkActiveF" : ""}>Funeral</Link>
                    <Link to="/graveyard" className={active == "/graveyard" ? "linkActiveG" : ""}>Graveyard</Link>
                </div>
                <div>
                    <appkit-button />
                </div>
            </div>
        </nav>
    )
}
