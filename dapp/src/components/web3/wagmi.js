import { createConfig } from "wagmi"
import { getDefaultConfig } from "connectkit"
import { hardhat, polygon, polygonMumbai } from "wagmi/chains"

const network = `${process.env.REACT_APP_NETWORK}`

export const config = createConfig(
  getDefaultConfig({
    appName: "NFT Cemetery",
    chains: [network === 'Hardhat'
      ? hardhat
      : network === 'Mumbai'
        ? polygonMumbai
        : polygon],
    autoConnect: true,
    // Optional
    appDescription: "NFT Cemetery | Put your NFT's to final rest.",
    // appUrl: "https://family.co", // app's url
    // appIcon: "https://family.co/logo.png", // app's icon, max 1024x1024px & max. 1MB
  }),
)
