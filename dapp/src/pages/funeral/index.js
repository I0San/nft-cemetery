import './index.css'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { useApprove } from '../../hooks/useApprove'
import { useBuryMyNFT } from '../../hooks/useBuryMyNFT'


export default function PageFuneral() {
  const { approve, approving, approveError } = useApprove()
  const { bury, burying, buryError } = useBuryMyNFT()
  const { isConnected } = useAccount()
  const [inscription, setInscription] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [dbInscription] = useDebounce(inscription, 1000)
  const [dbTokenId] = useDebounce(tokenId, 1000)
  const [dbTokenAddress] = useDebounce(tokenAddress, 1000)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (await approve(dbTokenAddress, dbTokenId)) {
      if (await bury(dbTokenAddress, dbTokenId, dbInscription)) {
        console.log('You successfully buried your NFT')
      }
    } else {
      console.log('You declined the transaction')
    }
  }

  return (
    <>
      <h1>Funeral</h1>
      {isConnected
        ?
        <div>
          <form
            className="formBurry"
            onSubmit={(e) => handleSubmit(e)}>

            <label htmlFor="inscription">Inscription</label>
            <input
              id="inscription"
              onChange={(e) => setInscription(e.target.value)}
              placeholder="Inscription"
              value={inscription}
              required
            />

            <label htmlFor="tokenAddress">Token Address</label>
            <input
              id="tokenAddress"
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Token Address"
              value={tokenAddress}
              required
            />

            <label htmlFor="tokenId">Token ID</label>
            <input
              id="tokenId"
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Token ID"
              value={tokenId}
              required
            />

            <button>Bury my NFT</button>
          </form>
        </div>
        : <p>Connect your wallet</p>
      }
    </>
  )
}
