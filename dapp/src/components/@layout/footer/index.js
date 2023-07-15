import { useState } from 'react'
import { Link } from "react-router-dom"
import './index.css'

const evmAddress = "0x386A5a8b33234B5eb22dAeE45C1693c8591cB4a2"
const btcAddress = "bc1qszdxp6dzrrzv6h0mnk0093k48h07j4rhvsjl9u"

export default function Footer() {
    const [showAddress, setShowAddress] = useState(0)

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
            </div>
        </footer>
    )
}