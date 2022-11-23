import { useEffect, useState, useMemo, useCallback } from 'react'
import { useLogger } from '../services'

/**
 * Mocks the `Storage` interface for environments that don't support the Web Storage API
 */
class StorageMock {
  readonly store: Map<string, string> = new Map()
  clear = () => this.store.clear()
  getItem = (key: string) => this.store.get(key)
  setItem = (key: string, value: string) => this.store.set(key, value)
  removeItem = (key: string) => this.store.delete(key)
}

enum StorageEventType {
  CLEAR_ALL = 'ClearAll',
  CLEAR_ITEM = 'ClearItem',
  SET_ITEM = 'SetItem'
}

type StorageEventDetail<T> = {
  type: StorageEventType
  key: string
  valStr?: string | null
  valObj?: T | null
}

const getStorageEvent = <T>({ type, ...props }: StorageEventDetail<T>) =>
  new CustomEvent<StorageEventDetail<T>>(type, {
    detail: { type, ...props }
  })

// A shared `StorageMock` instance to be used instead of `window.localStorage` for Jest and SSR
const storageMock = new StorageMock()

// A shared `EventTarget` instance that `useLocalStorage` instances use for communicating storage changes
const eventTarget = new EventTarget()

/**
 * @returns the `window.localStorage` object if `window` is defined,
 * or a shared `StorageMock` instance otherwise, to support Jest and SSR
 */
const useStorage = (): Storage | StorageMock => {
  const hasWindow = typeof window !== 'undefined'
  return useMemo<Storage | StorageMock>(
    () => (hasWindow ? window.localStorage : storageMock),
    [hasWindow]
  )
}

interface UseLocalStorageProps {
  key: string
  isObject?: boolean
  namespace?: string
}

export const useLocalStorage = <T = object>({
  key,
  isObject,
  namespace
}: UseLocalStorageProps) => {
  const logger = useLogger()
  const storage = useStorage()
  const storageKey = useMemo<string>(
    () => `${namespace || ''}:${key}`,
    [namespace, key]
  )

  /*
   * Returned values
   */

  const [error, setError] = useState<string | null>(null)
  const [valStr, setValStr] = useState<string | null>(null)
  const [valObj, setValObj] = useState<T | null>(null)

  // Removes the item with the supplied key and namespace from local storage
  const clear = useCallback(() => {
    storage.removeItem(storageKey)
    eventTarget.dispatchEvent(
      getStorageEvent<T>({ type: StorageEventType.CLEAR_ITEM, key: storageKey })
    )
  }, [storage, storageKey])

  // Removes all items from local storage
  const clearAll = useCallback(() => {
    storage.clear()
    eventTarget.dispatchEvent(new Event(StorageEventType.CLEAR_ALL))
  }, [storage])

  // Stores the string value in local storage under the supplied key and namespace
  const setString = useCallback(
    (value: string) => {
      if (!key) return setError('Missing key for storage')
      storage.setItem(storageKey, value)
      eventTarget.dispatchEvent(
        getStorageEvent<T>({
          type: StorageEventType.SET_ITEM,
          key: storageKey,
          valStr: value,
          valObj: null
        })
      )
    },
    [key, storage, storageKey]
  )

  // Stores the object value in local storage under the supplied key and namespace
  const setObject = useCallback(
    (value: T) => {
      if (!key) return setError('Missing key for storage')
      try {
        const valueStr = JSON.stringify(value)
        storage.setItem(storageKey, valueStr)
        eventTarget.dispatchEvent(
          getStorageEvent<T>({
            type: StorageEventType.SET_ITEM,
            key: storageKey,
            valStr: valueStr,
            valObj: value
          })
        )
      } catch (e) {
        logger.error(e)
        setError(`Failed to store JSON value for key: ${storageKey}`)
      }
    },
    [key, storage, storageKey, logger]
  )

  /*
   * Get initial value from store
   */

  useEffect(() => {
    setError(null)
    try {
      const item = storage.getItem(storageKey)
      setValStr(item || null)
      setValObj(item && isObject ? JSON.parse(item) : null)
    } catch (e) {
      logger.error(e)
      setError(`Failed to load JSON value for key: ${storageKey}`)
    }
  }, [logger, storage, storageKey, isObject])

  /*
   * Storage event listeners
   */

  useEffect(() => {
    const onClearAll = () => {
      setError(null)
      setValStr(null)
      setValObj(null)
    }
    const onClearItem = (event: CustomEvent<StorageEventDetail<T>>) => {
      if (storageKey === event.detail.key) {
        setError(null)
        setValStr(null)
        setValObj(null)
      }
    }
    const onSetItem = (event: CustomEvent<StorageEventDetail<T>>) => {
      if (storageKey === event.detail.key) {
        setError(null)
        setValStr(event.detail.valStr)
        setValObj(event.detail.valObj)
      }
    }
    eventTarget.addEventListener(StorageEventType.CLEAR_ALL, onClearAll)
    eventTarget.addEventListener(StorageEventType.CLEAR_ITEM, onClearItem)
    eventTarget.addEventListener(StorageEventType.SET_ITEM, onSetItem)
    return () => {
      eventTarget.removeEventListener(StorageEventType.CLEAR_ALL, onClearAll)
      eventTarget.removeEventListener(StorageEventType.CLEAR_ITEM, onClearItem)
      eventTarget.removeEventListener(StorageEventType.SET_ITEM, onSetItem)
    }
  }, [storageKey])

  return {
    error,
    valStr,
    valObj,
    clear,
    clearAll,
    setString,
    setObject
  }
}
