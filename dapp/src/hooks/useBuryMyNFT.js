import { useState } from "react"
import { useWalletClient } from "wagmi"
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from '../components/web3/wagmi'
import contractABI from '../components/web3/NFTCemeteryABI.json'

const contractAddress = `${import.meta.env.VITE_NFTCEMETERY_CONTRACT}`

export const useBuryMyNFT = () => {
    const { data: walletClient } = useWalletClient()
    const [result, setResult] = useState([false])

    const bury = async (nftAddress, tokenId, inscription) => {
        try {
            if (!walletClient) {
                throw new Error('Wallet not connected')
            }
            setResult([true])
            const hash = await walletClient.writeContract({
                address: contractAddress,
                abi: contractABI,
                functionName: 'burryMyNFT',
                args: [nftAddress, tokenId, inscription],
            })
            if (hash) {
                const receipt = await waitForTransactionReceipt(config, { hash })
                console.log(receipt)
                setResult([false])
                return true
            } else {
                return false
            }
        } catch (error) {
            setResult([false, error])
            return false
        }
    }

    return {
        bury,
        burying: result[0],
        buryError: result[1] ?? null,
    }
}
