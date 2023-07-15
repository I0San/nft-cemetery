import './index.css'
import { Link } from "react-router-dom"
import { ConnectKitButton } from "connectkit"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'


export default function Header() {
    let location = useLocation()
    const [active, setActive] = useState("/")
    
    useEffect(() => {
        setActive(location.pathname)
    }, [location])

    return (
        <nav>
            <div className="logo">NFT Cemetery</div>
            <div className="menuItems">
                <Link to="/" className={active == "/" ? "linkActiveH" : ""}>Home</Link>
                <Link to="/funeral" className={active == "/funeral" ? "linkActiveF" : ""}>Funeral</Link>
                <Link to="/graveyard" className={active == "/graveyard" ? "linkActiveG" : ""}>Graveyard</Link>
            </div>
            <div>
                <ConnectKitButton />
            </div>
        </nav>
    )
}