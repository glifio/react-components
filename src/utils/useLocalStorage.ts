import { useEffect, useState, useMemo } from 'react'
import { useLogger } from '../services'

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

const storageMock = new StorageMock()
const eventTarget = new EventTarget()

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

  const clear = () => {
    storage.removeItem(storageKey)
    eventTarget.dispatchEvent(
      getStorageEvent<T>({ type: StorageEventType.CLEAR_ITEM, key: storageKey })
    )
  }

  const clearAll = () => {
    storage.clear()
    eventTarget.dispatchEvent(new Event(StorageEventType.CLEAR_ALL))
  }

  const setString = (value: string) => {
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
  }

  const setObject = (value: T) => {
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
  }

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
