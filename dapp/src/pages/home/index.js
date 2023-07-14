import React, { useEffect, useRef } from 'react'
import { useGetGraveyard } from '../../hooks/useGetGraves'

export default function PageHome() {
  const shouldFetch = useRef(true)
  const { getGraves, getGravesLoading, getGravesError} = useGetGraveyard()

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false
      getGraves(1, 5)
    }
  }, [])
  return (
    <>
      <h1>Home</h1>
    </>
  )
}
