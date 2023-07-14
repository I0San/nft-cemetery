import React, { useEffect, useRef, useState } from 'react'
import { useGetGraveyard } from '../../hooks/useGetGraves'


export default function PageGraveyard() {
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
    <>
      <h1>Graveyard</h1>
      <p>Graves: {graves[1]?.toString()}</p>
      <div>
        {getGravesLoading && <p>Loading...</p>}
        {getGravesError && <p>Error: {getGravesError}</p>}
        {graves[0]?.map((grave, x) => (
          <div key={x} style={{borderBottom: '1px solid lightgrey'}}>
            <h4>{grave?.inscription}</h4>
            <small>Burried (block No.) {grave?.burried?.toString()}</small><br />
            <small>Address: {grave?.nftContract}</small><br />
            <small>TokenId: {grave?.nftId?.toString()}</small><br />
            <small>Owner: {grave?.nftOwner}</small><br />
          </div>
        ))}
      </div>
    </>
  )
}
