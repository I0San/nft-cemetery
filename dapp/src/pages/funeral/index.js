import './index.css'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAccount } from 'wagmi'
import { toast } from 'react-hot-toast'
import { useApprove } from '../../hooks/useApprove'
import { useBuryMyNFT } from '../../hooks/useBuryMyNFT'
import { PageTransition } from '../../components/@layout/pageTransition'
import useBodyClass from '../../hooks/useBodyClass'


export default function PageFuneral() {
  useBodyClass('funeral-bg')
  const { approve, approving, approveError } = useApprove()
  const { bury, burying, buryError } = useBuryMyNFT()
  const { isConnected } = useAccount()
  const [inscription, setInscription] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [dbInscription] = useDebounce(inscription, 500)
  const [dbTokenId] = useDebounce(tokenId, 500)
  const [dbTokenAddress] = useDebounce(tokenAddress, 500)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (await approve(dbTokenAddress, dbTokenId)) {
      if (await bury(dbTokenAddress, dbTokenId, dbInscription)) {
        toast.success('You\'ve successfully buried your NFT.')
      }
    } else {
      toast.error('You declined the transaction.')
    }
  }

  useEffect(() => {
    if (approveError !== null) {
      console.log(approveError)
      toast.error(approveError?.shortMessage ? approveError.shortMessage : "Oops! Something went wront. Sorry." )
    }
  }, [approveError])

  useEffect(() => {
    if (buryError !== null) {
      console.log(buryError)
      toast.error(buryError?.shortMessage ? buryError.shortMessage : "Oops! Something went wront. Sorry." )
    }
  }, [buryError])

  return (
    <PageTransition>
      <div className="funeral-wrapper">
        <div className="funeral-container">
          <h1>NFT Funeral</h1>
          {isConnected
            ?
            <div>
              <form
                className="formBurry"
                onSubmit={(e) => handleSubmit(e)}>

                <input
                  id="inscription"
                  onChange={(e) => setInscription(e.target.value)}
                  placeholder="Inscription (ex. R.I.P. NFT)"
                  value={inscription}
                  className="input-txt"
                  maxLength="50"
                  required
                />

                <input
                  id="tokenAddress"
                  onChange={(e) => setTokenAddress(e.target.value)}
                  placeholder="Token Address"
                  value={tokenAddress}
                  className="input-txt"
                  required
                />

                <input
                  id="tokenId"
                  onChange={(e) => setTokenId(e.target.value)}
                  placeholder="Token ID"
                  value={tokenId}
                  className="input-txt"
                  required
                />

                <button className="btnBury">
                  {approving
                  ? "Approving..."
                  : burying
                  ? "Burying..."
                  : "BURY MY NFT"}
                </button>
              </form>
            </div>
            : <p>Connect your wallet</p>
          }
        </div>
      </div>
    </PageTransition>
  )
}
