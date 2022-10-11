import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { IconMetaMask } from '../../Icons'
import { HelperText } from './Helper'
import {
  useWalletProvider,
  createWalletProvider
} from '../../../services/WalletProvider'
import { connectFILSnap as _connectFILSnap } from '../../../services/WalletProvider/metamaskUtils'
import { LoginOption } from '../../../customPropTypes'
import { OneColumnCentered, TwoColumns } from '../../Layout'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const transitionIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.25)
  }

  to {
    opacity: 1;
    transform: scale(1.35)
  }
`

const MMFadeIn = styled.div`
  opacity: 0;
  animation-name: ${transitionIn};
  animation-delay: 0.25s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
`

export const MetaMask = ({ next, back }: MetamaskProps) => {
  const [fetchingState, setFetchingState] = useState(false)
  const { dispatch, state, connectMetaMask, fetchDefaultWallet, walletList } =
    useWalletProvider()

  const _next = useCallback(
    async (time = 500) => {
      // avoid screen blips
      await sleep(time)
      next()
    },
    [next]
  )

  const fetchMetaMaskState = useCallback(async () => {
    const provider = await connectMetaMask()
    if (provider) {
      dispatch(createWalletProvider(provider, LoginOption.METAMASK))
      const wallet = await fetchDefaultWallet(provider)
      if (wallet) {
        walletList([wallet])
        setFetchingState(false)
        await _next()
      }
    }
  }, [dispatch, walletList, fetchDefaultWallet, _next, connectMetaMask])

  useEffect(() => {
    if (state.metamask.loading && !state.metamask.error && !fetchingState) {
      setFetchingState(true)
      fetchMetaMaskState()
    }
    // user clicked back...
    else if (
      !state.metamask.loading &&
      !state.metamask.error &&
      state.wallets.length > 0
    ) {
      _next(1200)
    }
  }, [
    fetchMetaMaskState,
    state.metamask.loading,
    state.wallets.length,
    state.metamask.error,
    fetchingState,
    _next
  ])

  const connectFILSnap = useCallback(async () => {
    await _connectFILSnap()
    await fetchMetaMaskState()
  }, [fetchMetaMaskState])

  return (
    <TwoColumns>
      <OneColumnCentered>
        <MMFadeIn>
          <IconMetaMask height='231' width='245' />
        </MMFadeIn>
      </OneColumnCentered>
      <OneColumnCentered>
        <HelperText
          {...state.metamask}
          onRetry={fetchMetaMaskState}
          back={back}
          connectFILSnap={connectFILSnap}
        />
      </OneColumnCentered>
    </TwoColumns>
  )
}

export interface MetamaskProps {
  back: () => void
  next: () => void
}

MetaMask.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}
