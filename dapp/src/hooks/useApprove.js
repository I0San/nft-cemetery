import { useState } from "react"
import { usePublicClient } from "wagmi"
import { walletClient } from "../components/web3/walletClient"

const contractAddress = `${process.env.REACT_APP_NFTCEMETERY_CONTRACT}`
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
    const publicClient = usePublicClient()
    const [result, setResult] = useState([false])

    const approve = async (nftAddress, tokenId) => {
        try {
            setResult([true])
            const account = await walletClient.getAddresses()
            const hash = await walletClient.writeContract({
                address: nftAddress,
                abi: ApproveAbi,
                functionName: 'approve',
                account: account[0],
                args: [contractAddress, tokenId],
            })
            if (hash) {
                const receipt = await publicClient.waitForTransactionReceipt({ hash })
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
        approve,
        approving: result[0],
        approveError: result[1] ?? null,
    }
}
