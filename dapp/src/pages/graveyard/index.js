import './index.css'
import useBodyClass from '../../hooks/useBodyClass'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useRef, useState } from 'react'
import { useGetGraveyard } from '../../hooks/useGetGraves'
import { PageTransition } from '../../components/@layout/pageTransition'
import { shortenAddress } from '../../utils/common'
import { useGraveyardStore } from '../../store'

const explorerUrl = `${process.env.REACT_APP_EXPLORER_URL}`


export default function PageGraveyard() {
  useBodyClass('graveyard-bg')
  const shouldFetch = useRef(true)
  const graves = useGraveyardStore((state) => state.graves)
  const totalGraves = useGraveyardStore((state) => state.totalGraves)
  const page = useGraveyardStore((state) => state.page)
  const pageSize = useGraveyardStore((state) => state.pageSize)
  const setGraves = useGraveyardStore((state) => state.setGraves)
  const setTotalGraves = useGraveyardStore((state) => state.setTotalGraves)
  const setPage = useGraveyardStore((state) => state.setPage)
  const [hasMore, setHasMore] = useState(true)
  const { getGraves, getGravesLoading, getGravesError } = useGetGraveyard()

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false
      fetchData()
    }
  }, [])

  const fetchData = () => {
    if (page > 1 && page * pageSize >= totalGraves) { // || getGravesLoading || getGravesError || !graves?.length) {
      setHasMore(false)
      return
    }
    getGraves(page, pageSize).then((data) => {
      if (data && data.length > 0)
        if (data[1]) {
          setTotalGraves(parseInt(data[1].toString()))
          setGraves([...graves, ...data[0]])
          setPage(page + 1)
        }
    })
  }

  return (
    <PageTransition>
      {/* SEARCH BAR */}

      {/* <div className="graveyard-header">
        <div className="graveyard-search">
          <div className="graveyard-search-wrapper">
            <input type="text" placeholder="Search by address" />
          </div>
        </div>
      </div> */}

      {getGravesLoading && <p style={{color: 'white'}}>Loading...</p>}
      {/* {getGravesError && <p style={{color: 'white'}}>Error: {getGravesError}</p>} */}

      <div className="graveyard-wrapper">
        <InfiniteScroll
          dataLength={totalGraves}
          next={fetchData}
          hasMore={hasMore}
          // loader={<p style={{color: 'white'}}>Loading items...</p>}
          endMessage={<p style={{ color: 'white' }}>Total graves {totalGraves}.</p>}
        >
          <div className="graves">
            {graves?.length > 0 && graves?.map((grave, x) => (
              <div key={x} className="grave">
                <div className="grave-bg"></div>
                <div className="grave-content">
                  <div className="graveTitle">{grave?.inscription}</div>
                  <div className="graveTokenId">
                    <a href={`${explorerUrl}/address/${grave?.nftContract}`} target="_blank" className="grave-info">TokenId: {grave?.nftId?.toString()}</a>
                  </div>
                  <div className="graveBlockNo">
                    <a href={`${explorerUrl}/block/${grave?.burried.toString()}`} target="_blank" className="grave-info">Buried: block #{grave?.burried?.toString()}</a>
                  </div>
                  <div className="graveAddress tspacer">
                    <a href={`${explorerUrl}/address/${grave?.nftContract}`} target="_blank" className="grave-info">Address: {shortenAddress(grave?.nftContract, 10)}</a>
                  </div>
                  <div className="graveAddress">
                    <a href={`${explorerUrl}/address/${grave?.nftOwner}`} target="_blank" className="grave-info">Owner: {shortenAddress(grave?.nftOwner, 10)}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </PageTransition>
  )
}
