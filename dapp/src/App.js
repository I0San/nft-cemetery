import { Routes, Route } from "react-router-dom"
import { WagmiConfig } from "wagmi"
import { config } from './components/web3/wagmi'
import { ConnectKitCustomProvider } from "./components/web3/connectKitCustomProvider"
import MainLayout from "./components/@layout"
import PageHome from "./pages/home"
import PageGraveyard from "./pages/graveyard"
import PageFuneral from "./pages/funeral"
import { useEffect } from "react"

const network = `${process.env.REACT_APP_NETWORK}`

function App() {
  useEffect(() => { console.log('Network: ', network)}, [])
  return (
    <WagmiConfig config={config}>
      <ConnectKitCustomProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PageHome />} />
            <Route path="graveyard" element={<PageGraveyard />} />
            <Route path="funeral" element={<PageFuneral />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </ConnectKitCustomProvider>
    </WagmiConfig>
  )
}

export default App
