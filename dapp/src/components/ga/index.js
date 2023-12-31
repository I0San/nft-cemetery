import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from "react-ga4"

const ga = `${process.env.REACT_APP_GOOGLE_ANALITICS_ID}`

export default function GA() {
  const shouldInit = useRef(true)
  let location = useLocation()

  useEffect(() => {
    if (shouldInit.current) {
      shouldInit.current = false
      ReactGA.initialize(ga)
    }
  }, [])

  useEffect(() => {
    if (!location) return
    ReactGA.send({ hitType: "pageview", page: location.pathname})
  }, [location])

  return <></>
}