import { ReactNode, useEffect } from 'react'
import { func, node } from 'prop-types'
import useWallet from '../WalletProvider/useWallet'

export function RequireWallet({
  children,
  gatekeep
}: {
  children: ReactNode
  gatekeep: () => void
}) {
  const wallet = useWallet()
  useEffect(() => {
    if (!wallet.address) {
      gatekeep()
    }
  }, [gatekeep, wallet.address])
  return <>{wallet.address && children}</>
}

RequireWallet.propTypes = {
  children: node.isRequired,
  gatekeep: func.isRequired
}
