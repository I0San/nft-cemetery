import { createWalletClient, custom } from 'viem'
import { hardhat, polygonMumbai, polygon } from 'viem/chains'

const network = `${process.env.REACT_APP_NETWORK}`

export const walletClient = createWalletClient({
    chain: network === 'Hardhat'
    ? hardhat
    : network === 'Mumbai'
      ? polygonMumbai
      : polygon,
    transport: custom(window.ethereum)
})