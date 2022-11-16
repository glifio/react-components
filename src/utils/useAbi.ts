import { ABI } from '@glif/filecoin-actor-utils'
import { useLocalStorage } from './useLocalStorage'

export const useAbi = (address: string) => {
  const {
    valObj: abi,
    setObject: setAbi,
    ...rest
  } = useLocalStorage<ABI>({
    key: address,
    isObject: true,
    namespace: 'ABI'
  })
  return { abi, setAbi, ...rest }
}
