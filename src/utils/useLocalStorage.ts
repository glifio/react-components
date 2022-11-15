import { useEffect, useState } from 'react'
import clonedeep from 'lodash.clonedeep'
import { useLogger } from '../services'

const loadFromStorage = <T>(namespace: string): Record<string, T> | null => {
  const kvPairs = window.localStorage.getItem(namespace)
  if (kvPairs) {
    const parsedKVPairs = JSON.parse(kvPairs) as Record<string, T>
    return parsedKVPairs
  }

  return null
}

export function useLocalStorage<T>(namespace: string) {
  const logger = useLogger()
  // This isn't the most efficient, but it works
  const [valueMap, setValueMap] = useState<Record<string, T>>({})
  const [loaded, setLoaded] = useState(false)

  // hydrate state from local storage on page load
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !loaded) {
        const kvPairs = loadFromStorage<T>(namespace)
        if (kvPairs) {
          if (
            Object.keys(valueMap).length === 0 &&
            Object.keys(kvPairs).length > 0
          ) {
            setLoaded(true)
            setValueMap(kvPairs)
          }
        }
      }
    } catch (error) {
      logger.error(error)
    }
  }, [namespace, valueMap, setValueMap, logger, loaded, setLoaded])

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setKV = (key: string, value: T) => {
    try {
      const kvPairs = loadFromStorage<T>(namespace) ?? {}
      const clone = clonedeep(kvPairs)
      clone[key] = value
      window.localStorage.setItem(namespace, JSON.stringify(clone))
      setValueMap(clone)
    } catch (error) {
      logger.error(error)
    }
  }

  const rmKey = (key: string) => {
    try {
      const kvPairs = loadFromStorage<T>(namespace)
      if (kvPairs) {
        const clone = clonedeep(kvPairs)
        clone[key] = null
        window.localStorage.setItem(namespace, JSON.stringify(clone))
        setValueMap(clone)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  return [valueMap, setKV, rmKey] as const
}
