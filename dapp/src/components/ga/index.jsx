import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from "react-ga4"

const ga = `${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`

export default function GA() {
  const shouldInit = useRef(true)
  let location = useLocation()

  useEffect(() => {
    if (shouldInit.current && ga) {
      shouldInit.current = false
      ReactGA.initialize(ga)
    }
  }, [])

  useEffect(() => {
    if (!location || !ga) return
    ReactGA.send({ hitType: "pageview", page: location.pathname})
  }, [location])

  return <></>
}
