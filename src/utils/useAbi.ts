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
    addresses: ['0x2b3ef6906429b580b7b2080de5ca893bc282c225']
  },
  {
    abi: PoolToken,
    name: 'PoolToken',
    addresses: [
      '0x690908f7fa93afc040cfbd9fe1ddd2c2668aa0e0',
      '0x6d3fe695248336472a4242a1b3765f81ef197dea',
      '0xc61f959a0da2b3b703f283d05b924878447c8048'
    ]
  },
  {
    abi: PreStake,
    name: 'PreStake',
    addresses: [
      '0x0ec46ad7aa8600118da4bd64239c3dc364fd0274',
      '0x08d0361c92f0cbdb1e2fe49c2e98e6725ac71867',
      '0x546275ffe542db3a8cf877316fda7bbdbf515005'
    ]
  },
  {
    abi: PublicGoods,
    name: 'PublicGoods',
    addresses: [
      '0x3bc5b7822b3a73a3f5916a590e32488dfc6f3a01',
      '0xd632a8ece5a5ef690eddd0847e70c39daf5fba07'
      // '',
    ]
  },
  {
    abi: WFIL,
    name: 'WFIL',
    addresses: [
      '0x60e1773636cf5e4a227d9ac24f20feca034ee25a',
      '0x6c297aed654816dc5d211c956de816ba923475d2',
      '0xfbeafeec0e5df7cf78169036521efba5576d9faf'
    ]
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
