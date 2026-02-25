import './index.css'
import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

const evmAddress = "0x386A5a8b33234B5eb22dAeE45C1693c8591cB4a2"
const btcAddress = "bc1qszdxp6dzrrzv6h0mnk0093k48h07j4rhvsjl9u"

export default function Footer() {
    let location = useLocation()
    const [showAddress, setShowAddress] = useState(0)
    const [active, setActive] = useState("/")

    useEffect(() => {
        setActive(location.pathname)
    }, [location])

    const handleDonate = (e) => {
        e.preventDefault()
        if (showAddress == 0) {
            setShowAddress(1)
        } else if (showAddress == 1) {
            navigator.clipboard.writeText(btcAddress)
            setShowAddress(3)
            setTimeout(() => {
                setShowAddress(2)
            }, 1000)
        } else if (showAddress == 2) {
            navigator.clipboard.writeText(evmAddress)
            setShowAddress(3)
            setTimeout(() => {
                setShowAddress(0)
            }, 1000)
        } else {
            setShowAddress(0)
        }
    }

    return (
        <footer>
            <div className="footerWrapper">
                <div className="footerItems">
                    <Link to="https://github.com/I0San/nft-cemetery" target="_blank">GitHub</Link>
                    <Link to="https://github.com/I0San/nft-cemetery#readme" target="_blank">Contribute code!</Link>
                </div>
                <div className="footerItems">
                    <Link to="/" onClick={(e) => handleDonate(e)}>{
                        showAddress == 0
                            ? "Donate"
                            : showAddress == 1
                                ? `BTC ${btcAddress}`
                                : showAddress == 2
                                    ? `EVM ${evmAddress}`
                                    : "Copied!"}
                    </Link>
                </div>

                {/* MOBILE ITEMS TEMPORARY */}
                <div className="mobileMenuItems">
                    <Link to="/" className={active == "/" ? "linkActiveH" : ""}>Home</Link>
                    <Link to="/funeral" className={active == "/funeral" ? "linkActiveF" : ""}>Funeral</Link>
                    <Link to="/graveyard" className={active == "/graveyard" ? "linkActiveG" : ""}>Graveyard</Link>
                </div>

            </div>
        </footer>
    )
}
