import PropTypes from 'prop-types'
import { useState } from 'react'
import { LedgerError } from './LedgerError'
import {
  useWalletProvider,
  createWalletProvider
} from '../../../services/WalletProvider'
import { ButtonRowSpaced, Dialog, ShadowBox } from '../../Layout'
import { LoginOption } from '../../../customPropTypes'
import { ButtonV2 } from '../../Button/V2'
import { Loading } from '../Loading'
import { LoadingIcon } from '../../Loading/LoadingIcon'

export const Ledger = ({ next, back }: LedgerProps) => {
  const { connectLedger, dispatch, ledger, fetchDefaultWallet, walletList } =
    useWalletProvider()
  const [uncaughtError, setUncaughtError] = useState('')
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    setUncaughtError('')
    try {
      const provider = await connectLedger()
      if (provider) {
        dispatch(createWalletProvider(provider, LoginOption.LEDGER))
        const wallet = await fetchDefaultWallet(provider)
        if (wallet) {
          walletList([wallet])
          next()
        }
      }
    } catch (err) {
      setUncaughtError(err?.message || err.toString())
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <LedgerError {...ledger} otherError={uncaughtError} />
      <ShadowBox>
        <h2>Connect with Ledger Device</h2>
        <hr />
        {loading ? (
          <Loading>
            <LoadingIcon />
            <p>Loading...</p>
          </Loading>
        ) : (
          <>
            <p>Please unlock your Ledger device and open the Filecoin App</p>
            <a href='https://blog.glif.io/install-filecoin-ledger/'>
              Click here for installation instructions.
            </a>
          </>
        )}
      </ShadowBox>
      <ButtonRowSpaced>
        <ButtonV2 large disabled={loading} onClick={back} type='button'>
          Back
        </ButtonV2>
        <ButtonV2 large disabled={loading} green onClick={onClick}>
          Connect
        </ButtonV2>
      </ButtonRowSpaced>
    </Dialog>
  )
}

export interface LedgerProps {
  back: () => void
  next: () => void
}

Ledger.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}
