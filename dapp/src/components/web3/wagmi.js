import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { hardhat, polygon, polygonAmoy } from '@reown/appkit/networks'

const network = `${import.meta.env.VITE_NETWORK}`
const projectId = `${import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}`

const getNetwork = () => {
  if (network === 'Hardhat') return hardhat
  if (network === 'Mumbai') return polygonAmoy
  return polygon
}

const networks = [getNetwork()]

const metadata = {
  name: 'NFT Cemetery',
  description: "NFT Cemetery | Put your NFT's to final rest.",
  url: `${import.meta.env.VITE_APP_URL}`,
  icons: ['https://nft-cemetery.vercel.app/icons/apple-touch-icon.png']
}

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  },
  themeVariables: {
    '--w3m-color-mix': '#20202d',
    '--w3m-color-mix-strength': 40,
    '--w3m-accent': '#4f286b',
    '--w3m-border-radius-master': '4px'
  }
})

export const config = wagmiAdapter.wagmiConfig
