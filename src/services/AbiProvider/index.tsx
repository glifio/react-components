import { createContext, ReactNode, useContext } from 'react'
import { ABI } from '@glif/filecoin-actor-utils'
import { useLocalStorage } from '../../utils'

export interface AbiContextType {
  abis: Record<string, ABI>
  setAbi: (key: string, val: string) => void
  rmAbi: (key: string) => void
}

export const AbiContext = createContext<ABI>(null)

export const AbiProvider = ({ children }: AbiProviderProps) => {
  const [abis, setAbi, rmAbi] = useLocalStorage<ABI>('ABI')
  return (
    <AbiContext.Provider value={{ abis, setAbi, rmAbi }}>
      {children}
    </AbiContext.Provider>
  )
}

export const useAbi = (address: string): ABI | null => {
  const { abis, setAbi, rmAbi } = useContext(AbiContext)
  return [abis?.[address], setAbi, rmAbi]
}

type AbiProviderProps = {
  children: ReactNode
}
