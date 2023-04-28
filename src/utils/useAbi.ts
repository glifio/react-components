import { ABI } from '@glif/filecoin-actor-utils'
import { ethAddressFromDelegated } from '@glif/filecoin-address'
import { useCallback, useMemo } from 'react'

import { isEthAddress } from './isAddress'
import { isDelegatedAddress } from './isAddress'
import { useLocalStorage } from './useLocalStorage'

import FilForwarder from '../abi/FilForwarder'
import PoolToken from '../abi/PoolToken'
import PreStake from '../abi/PreStake'
import PublicGoods from '../abi/PublicGoods'
import WFIL from '../abi/wfil'

interface KnownAbi {
  abi: ABI
  name: string
  addresses: string[]
}

const KnownAbis: KnownAbi[] = [
  {
    abi: FilForwarder,
    name: 'FilForwarder',
    addresses: ['0x2B3ef6906429b580b7b2080de5CA893BC282c225'].map(a =>
      a.toLowerCase()
    )
  },
  {
    abi: PoolToken,
    name: 'PoolToken',
    addresses: [
      '0x690908f7fa93afC040CFbD9fE1dDd2C2668Aa0e0',
      '0x1c0F47A9C97b304ad7CAdf31649E3A6c6999DC39',
      '0xe3d4f91bbe256405403d253b990ffac96c24f06f'
    ].map(a => a.toLowerCase())
  },
  {
    abi: PreStake,
    name: 'PreStake',
    addresses: [
      '0x0ec46ad7aa8600118da4bd64239c3dc364fd0274',
      '0x3Ea98B5c34935921E9CCf8a0e1710c864efF15c1',
      '0xa38aaa4691f3b4bce3fc556b05bfa6fd55c71f8c'
    ].map(a => a.toLowerCase())
  },
  {
    abi: PublicGoods,
    name: 'PublicGoods',
    addresses: [
      '0x3bc5b7822b3a73a3f5916a590e32488dfc6f3a01',
      '0xfD6ba95B3cb24F1412b25e8d44D4e1CF3949916A',
      '0xff9ac1b845d354b3fa7346946decf0befaa53189'
    ].map(a => a.toLowerCase())
  },
  {
    abi: WFIL,
    name: 'WFIL',
    addresses: [
      '0x60E1773636CF5E4A227d9AC24F20fEca034ee25A',
      '0x6C297AeD654816dc5d211c956DE816Ba923475D2',
      '0x4e8a1223bed939721c9a9db6e2a301ee94baec8e'
    ].map(a => a.toLowerCase())
  }
]

export const useAbi = (address: string) => {
  const ethAddress = useMemo<string | undefined>(() => {
    if (isEthAddress(address)) return address
    if (isDelegatedAddress(address)) return ethAddressFromDelegated(address)
  }, [address])

  const knownAbi = useMemo<KnownAbi | null>(() => {
    if (!ethAddress) return null
    return KnownAbis.find(abi =>
      abi.addresses.includes(ethAddress.toLowerCase())
    )
  }, [ethAddress])

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
    abi: knownAbi ? knownAbi.abi : abiObject,
    abiName: knownAbi ? knownAbi.name : abiName,
    error,
    setAbi,
    clearAbi,
    clearAllAbis
  }
}
