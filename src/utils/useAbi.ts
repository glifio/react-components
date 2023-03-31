import { ABI } from '@glif/filecoin-actor-utils'
import { ethAddressFromDelegated } from '@glif/filecoin-address'
import { useCallback, useMemo } from 'react'

import { isEthAddress } from './isAddress'
import { isDelegatedAddress } from './isAddress'
import { useLocalStorage } from './useLocalStorage'

import FilForwarder from '../abi/FilForwarder.json'
import PoolToken from '../abi/PoolToken.json'
import PreStake from '../abi/PreStake.json'
import wfil from '../abi/wfil.json'

const abiMap = new Map<string, ABI>([
  ['0x2B3ef6906429b580b7b2080de5CA893BC282c225', FilForwarder],
  ['0x690908f7fa93afC040CFbD9fE1dDd2C2668Aa0e0', PoolToken],
  ['0x6d3fe695248336472a4242a1b3765f81ef197dea', PoolToken],
  ['0x0ec46ad7aa8600118da4bd64239c3dc364fd0274', PreStake],
  ['0x08d0361c92f0cbdb1e2fe49c2e98e6725ac71867', PreStake],
  ['0x60E1773636CF5E4A227d9AC24F20fEca034ee25A', wfil],
  ['0x6C297AeD654816dc5d211c956DE816Ba923475D2', wfil]
])

export const useAbi = (address: string) => {
  const ethAddress = useMemo(() => {
    if (isEthAddress(address)) return address
    if (isDelegatedAddress(address)) return ethAddressFromDelegated(address)
  }, [address])

  const abiFromMap = useMemo<ABI | null>(
    () => abiMap.get(ethAddress) ?? null,
    [ethAddress]
  )

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

  return {
    abi: abiFromMap ?? abiObject,
    abiName,
    error,
    setAbi,
    clearAbi,
    clearAllAbis
  }
}
