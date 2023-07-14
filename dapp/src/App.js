import { Routes, Route} from "react-router-dom"
import { WagmiConfig } from "wagmi"
import { ConnectKitProvider } from "connectkit"
import { config } from './components/web3/wagmi'
import MainLayout from "./components/@layout"
import PageHome from "./pages/home"
import PageGraveyard from "./pages/graveyard"
import PageFuneral from "./pages/funeral"


function App() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PageHome />} />
            <Route path="graveyard" element={<PageGraveyard />} />
            <Route path="funeral" element={<PageFuneral />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
