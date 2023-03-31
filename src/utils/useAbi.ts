import { ABI } from '@glif/filecoin-actor-utils'
import { ethAddressFromDelegated } from '@glif/filecoin-address'
import { useCallback, useMemo } from 'react'

import { isEthAddress } from './isAddress'
import { isDelegatedAddress } from './isAddress'
import { useLocalStorage } from './useLocalStorage'

import FilForwarder from '../abi/FilForwarder'
import PoolToken from '../abi/PoolToken'
import PreStake from '../abi/PreStake'
import wfil from '../abi/wfil'

const abiMap = new Map<string, ABI>([
  ['0x2b3ef6906429b580b7b2080de5ca893bc282c225', FilForwarder],
  ['0x690908f7fa93afc040cfbd9fe1ddd2c2668aa0e0', PoolToken],
  ['0x6d3fe695248336472a4242a1b3765f81ef197dea', PoolToken],
  ['0x0ec46ad7aa8600118da4bd64239c3dc364fd0274', PreStake],
  ['0x08d0361c92f0cbdb1e2fe49c2e98e6725ac71867', PreStake],
  ['0x60e1773636cf5e4a227d9ac24f20feca034ee25a', wfil],
  ['0x6c297aed654816dc5d211c956de816ba923475d2', wfil]
])

const abiNameMap = new Map<string, string>([
  ['0x2b3ef6906429b580b7b2080de5ca893bc282c225', 'FilForwarder'],
  ['0x690908f7fa93afc040cfbd9fe1ddd2c2668aa0e0', 'PoolToken'],
  ['0x6d3fe695248336472a4242a1b3765f81ef197dea', 'PoolToken'],
  ['0x0ec46ad7aa8600118da4bd64239c3dc364fd0274', 'PreStake'],
  ['0x08d0361c92f0cbdb1e2fe49c2e98e6725ac71867', 'PreStake'],
  ['0x60e1773636cf5e4a227d9ac24f20feca034ee25a', 'wfil'],
  ['0x6c297aed654816dc5d211c956de816ba923475d2', 'wfil']
])

export const useAbi = (address: string) => {
  const ethAddress = useMemo(() => {
    if (isEthAddress(address)) return address
    if (isDelegatedAddress(address)) return ethAddressFromDelegated(address)
  }, [address])

  const abiFromMap = useMemo<ABI | null>(
    () => abiMap.get(ethAddress?.toLowerCase()) ?? null,
    [ethAddress]
  )

  const abiNameFromMap = useMemo<string | null>(
    () => abiNameMap.get(ethAddress?.toLowerCase()) ?? null,
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
    abiName: abiNameFromMap ?? abiName,
    error,
    setAbi,
    clearAbi,
    clearAllAbis
  }
}
