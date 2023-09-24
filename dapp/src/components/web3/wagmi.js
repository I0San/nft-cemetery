import { createConfig } from "wagmi"
import { getDefaultConfig } from "connectkit"
import { hardhat, polygon } from "wagmi/chains"

const network = `${process.env.REACT_APP_NETWORK}`
const alchemyId = `${process.env.REACT_APP_ALCHEMY_ID}`

const polygonMumbai = {
  id: 80001,
  name: "Polygon Mumbai",
  network: "maticmum",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
      ],
    },
    public: {
      http: [
        `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
      ],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com",
    },
    default: {
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com",
    },
  },
}

export const config = createConfig(
  getDefaultConfig({
    appName: "NFT Cemetery",
    chains: [network === 'Hardhat'
      ? hardhat
      : network === 'Mumbai'
        ? polygonMumbai
        : polygon],
    autoConnect: true,
    walletConnectProjectId: `${process.env.REACT_APP_WALLETCONNECT_PROJECT_ID}`,
    // Optional
    appDescription: "NFT Cemetery | Put your NFT's to final rest.",
    // appUrl: "https://family.co", // app's url
    // appIcon: "https://family.co/logo.png", // app's icon, max 1024x1024px & max. 1MB
  }),
)
