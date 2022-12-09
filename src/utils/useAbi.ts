import { ABI } from '@glif/filecoin-actor-utils'
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useAbi = (address: string) => {
  const {
    valObj: abiObject,
    error: abiObjectError,
    setObject: setAbiObject,
    clear: clearAbiObject,
    clearAll: clearAllAbiObjects
  } = useLocalStorage<ABI>({
    key: address,
    isObject: true,
    namespace: 'ABI'
  })

  const {
    valStr: abiName,
    error: abiNameError,
    setString: setAbiName,
    clear: clearAbiName,
    clearAll: clearAllAbiNames
  } = useLocalStorage({
    key: address,
    isObject: false,
    namespace: 'ABI-NAME'
  })

  const error = abiObjectError || abiNameError || null

  const setAbi = useCallback(
    (abi: ABI, name: string) => {
      setAbiObject(abi)
      setAbiName(name)
    },
    [setAbiObject, setAbiName]
  )

  const clearAbi = useCallback(() => {
    clearAbiObject()
    clearAbiName()
  }, [clearAbiObject, clearAbiName])

  const clearAllAbis = useCallback(() => {
    clearAllAbiObjects()
    clearAllAbiNames()
  }, [clearAllAbiObjects, clearAllAbiNames])

  return { abi: abiObject, abiName, error, setAbi, clearAbi, clearAllAbis }
}
