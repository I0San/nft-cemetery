import { useState } from "react"
import { usePublicClient } from "wagmi"
import { walletClient } from "../components/web3/walletClient"
import contractABI from '../components/web3/NFTCemeteryABI.json'

const contractAddress = `${process.env.REACT_APP_NFTCEMETERY_CONTRACT}`

export const useBuryMyNFT = () => {
    const publicClient = usePublicClient()
    const [result, setResult] = useState([false])

    const bury = async (nftAddress, tokenId, inscription) => {
        try {
            setResult([true])
            const account = await walletClient.getAddresses()
            const hash = await walletClient.writeContract({
                address: contractAddress,
                abi: contractABI,
                functionName: 'burryMyNFT',
                account: account[0],
                args: [nftAddress, tokenId, inscription],
            })
            if (hash) {
                const receipt = await publicClient.waitForTransactionReceipt({ hash })
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
