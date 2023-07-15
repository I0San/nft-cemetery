import React, { useEffect, useRef, useState } from 'react'
import { useGetGraveyard } from '../../hooks/useGetGraves'
import useBodyClass from '../../hooks/useBodyClass'
import './index.css'
import { PageTransition } from '../../components/@layout/pageTransition'

export default function PageGraveyard() {
  useBodyClass('graveyard-bg')
  const shouldFetch = useRef(true)
  const { getGraves, getGravesLoading, getGravesError } = useGetGraveyard()
  const [graves, setGraves] = useState([])

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false
      getGraves().then((data) => {
        setGraves(data)
      })
    }
  }, [])

  return (
    <PageTransition>
      <div className="graveyard-wrapper">
        <div className="graveyard-container">
          
          <h1>Graveyard</h1>
          <p>Graves: {graves[1]?.toString()}</p>

          <div className="graves">
            {getGravesLoading && <p>Loading...</p>}
            {getGravesError && <p>Error: {getGravesError}</p>}
            {graves[0]?.map((grave, x) => (
              <div key={x} className="grave">
                <div className="graveTitle">{grave?.inscription}</div>
                <a href="" className="grave-info"><small>TokenId: {grave?.nftId?.toString()}</small></a><br />
                <a href="" className="grave-info"><small>Address: {grave?.nftContract}</small></a><br />
                <a href="" className="grave-info"><small>Burried (block No.) {grave?.burried?.toString()}</small></a><br />
                <a href="" className="grave-info"><small>Owner: {grave?.nftOwner}</small></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
