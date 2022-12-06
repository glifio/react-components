import { ABI } from '@glif/filecoin-actor-utils'
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useAbi = (address: string) => {
  const {
    valObj: abi,
    error: abiError,
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

  const error = abiError || abiNameError || null

  const setAbi = useCallback(
    (abiObj: ABI, name: string) => {
      setAbiObject(abiObj)
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

  return { abi, abiName, error, setAbi, clearAbi, clearAllAbis }
}
