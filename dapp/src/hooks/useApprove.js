import { useState } from "react"
import { useWalletClient } from "wagmi"
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from '../components/web3/wagmi'

const contractAddress = `${import.meta.env.VITE_NFTCEMETERY_CONTRACT}`
const ApproveAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const useApprove = () => {
    const { data: walletClient } = useWalletClient()
    const [result, setResult] = useState([false])

    const approve = async (nftAddress, tokenId) => {
        try {
            if (!walletClient) {
                throw new Error('Wallet not connected')
            }
            setResult([true])
            const hash = await walletClient.writeContract({
                address: nftAddress,
                abi: ApproveAbi,
                functionName: 'approve',
                args: [contractAddress, tokenId],
            })
            if (hash) {
                const receipt = await waitForTransactionReceipt(config, { hash })
                console.log('receipt', receipt)
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
        approve,
        approving: result[0],
        approveError: result[1] ?? null,
    }
}
