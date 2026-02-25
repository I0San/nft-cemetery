import { Routes, Route } from "react-router-dom"
import { AppKitProvider } from "./components/web3/AppKitProvider"
import MainLayout from "./components/@layout"
import PageHome from "./pages/home"
import PageGraveyard from "./pages/graveyard"
import PageFuneral from "./pages/funeral"
import { useEffect } from "react"
import GA from "./components/ga"

const network = `${import.meta.env.VITE_NETWORK}`

function App() {
  useEffect(() => { 
    console.log(`v${import.meta.env.VITE_VERSION}`)
    console.log('Network: ', network)
  }, [])
  return (
    <AppKitProvider>
      <GA />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PageHome />} />
          <Route path="graveyard" element={<PageGraveyard />} />
          <Route path="funeral" element={<PageFuneral />} />
        </Route>
      </Routes>
    </AppKitProvider>
  )
}

export default App
