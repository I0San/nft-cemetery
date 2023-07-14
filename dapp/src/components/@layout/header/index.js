import { Link } from "react-router-dom"
import { ConnectKitButton } from "connectkit"
import './index.css'

export default function Header() {
    return (
        <nav>
            <div className="menuItems">
                <Link to="/">Home</Link>
                <Link to="/graveyard">Graveyard</Link>
                <Link to="/funeral">Funeral</Link>
            </div>
            <div>
                <ConnectKitButton />
            </div>
        </nav>
    )
}