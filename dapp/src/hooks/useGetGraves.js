import { useState } from "react"
import { getContract } from "viem"
import { usePublicClient } from "wagmi"
import contractABI from '../components/web3/NFTCemeteryABI.json'

const contractAddress = `${process.env.REACT_APP_NFTCEMETERY_CONTRACT}`

export const useGetGraveyard = () => {
  const publicClient = usePublicClient()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const getGraves = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true)
      const contract = getContract({
        address: contractAddress,
        abi: contractABI,
        publicClient,
      })
      const data = await contract.read.getGraveyard([page, pageSize])
      console.log(data)
      setLoading(false)
      return data
    } catch (error) {
      setError(error)
      return undefined
    }
  }

  return {
    getGraves,
    getGravesLoading: loading,
    getGravesError: error,
  }
}
