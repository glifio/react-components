import { createContext, ReactNode, useContext } from 'react'
import { ABI } from '@glif/filecoin-actor-utils'
import { useLocalStorage } from '../../utils'

export interface AbiContextType {
  abis: Record<string, ABI>
  getAbi: (key: string) => ABI | null
  setAbi: (key: string, val: string) => void
  rmAbi: (key: string) => void
}

export const AbiContext = createContext<ABI>(null)

export const AbiProvider = ({ children }: AbiProviderProps) => {
  const [abis, setAbi, rmAbi] = useLocalStorage<ABI>('ABI')

  const getAbi = (address: string): ABI | null => {
    return abis[address] || null
  }

  return (
    <AbiContext.Provider value={{ abis, getAbi, setAbi, rmAbi }}>
      {children}
    </AbiContext.Provider>
  )
}

export const useAbi = (address: string): ABI | null => {
  const { getAbi, setAbi, rmAbi } = useContext(AbiContext)
  return [getAbi(address), setAbi, rmAbi]
}

type AbiProviderProps = {
  children: ReactNode
}
