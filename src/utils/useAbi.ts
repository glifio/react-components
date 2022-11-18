import { ABI } from '@glif/filecoin-actor-utils'
import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useAbi = (address: string) => {
  const {
    valObj: abi,
    setObject: setAbi,
    clear: clearAbi,
    clearAll: clearAllAbis,
    ...rest
  } = useLocalStorage<ABI>({
    key: address,
    isObject: true,
    namespace: 'ABI'
  })

  const {
    valStr: abiName,
    setString: setAbiName,
    clear: clearAbiName,
    clearAll: clearAllAbiNames
  } = useLocalStorage<ABI>({
    key: address,
    isObject: false,
    namespace: 'ABI-NAME'
  })

  const clear = useCallback(() => {
    clearAbi()
    clearAbiName()
  }, [clearAbiName, clearAbi])

  const clearAll = useCallback(() => {
    clearAllAbiNames()
    clearAllAbis()
  }, [clearAllAbiNames, clearAllAbis])

  return { abi, abiName, setAbiName, setAbi, clear, clearAll, ...rest }
}
