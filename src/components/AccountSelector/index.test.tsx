import React from 'react'
import { render, act, screen, waitFor } from '@testing-library/react'
import { CoinType } from '@glif/filecoin-address'

import AccountSelector from '.'

import composeMockAppTree from '../../test-utils/composeMockAppTree'
import { MockedProvider } from '@apollo/client/testing'
import { AddressDocument } from '../../generated/graphql'
import {
  WALLET_ADDRESS,
  WALLET_ADDRESS_2,
  WALLET_ADDRESS_3,
  WALLET_ID,
  WALLET_ID_2,
  WALLET_ID_3
} from '../../test-utils/constants'

jest
  .spyOn(require('./loadNextAccount'), 'loadNextAccount')
  .mockImplementation(
    (
      index,
      provider,
      coinType,
      getBalance,
      getAddress,
      setLoadedFirstWallet,
      setLoadingPage,
      setLoadingWallets,
      _walletList
    ) => {
      // @ts-ignore
      setLoadingWallets(false)
      return Promise.resolve()
    }
  )

jest.mock('../../services/WalletProvider')

const addrs = [
  { robust: WALLET_ADDRESS, id: WALLET_ID },
  { robust: WALLET_ADDRESS_2, id: WALLET_ID_2 },
  { robust: WALLET_ADDRESS_3, id: WALLET_ID_3 }
]

const apolloMocks = addrs.map(({ robust, id }) => {
  return {
    request: {
      query: AddressDocument,
      variables: {
        address: robust
      }
    },
    result: {
      data: {
        address: {
          robust,
          id
        }
      }
    }
  }
})

describe('AccountSelector', () => {
  test('it displays the loading screen first', async () => {
    const { Tree } = composeMockAppTree('multiAccount')
    await act(async () => {
      let res = render(
        <MockedProvider mocks={apolloMocks}>
          <Tree>
            <AccountSelector
              title=''
              helperText=''
              coinType={CoinType.TEST}
              onSelectAccount={() => {}}
            />
          </Tree>
        </MockedProvider>
      )
      expect(screen.getByText(/Loading/)).toBeInTheDocument()
      expect(res.container).toMatchSnapshot()
    })
  })

  test('it displays the accounts in a table view and option to load next account', async () => {
    const { Tree } = composeMockAppTree('multiAccount')
    await act(async () => {
      let res = render(
        <MockedProvider mocks={apolloMocks}>
          <Tree>
            <AccountSelector
              title='Select Account'
              helperText=''
              coinType={CoinType.TEST}
              onSelectAccount={() => {}}
            />
          </Tree>
        </MockedProvider>
      )

      await waitFor(() => {
        expect(screen.getByText(/Select Account/)).toBeInTheDocument()
        addrs.forEach(({ robust, id }, i) => {
          expect(screen.getByText(robust)).toBeInTheDocument()
          expect(screen.getByText(id)).toBeInTheDocument()
          const role = screen.getAllByRole('link')[i]
          expect(
            role
              .getAttribute('href')
              ?.includes(`/actor/?address=${robust || id}`)
          )
        })

        expect(screen.getByText(/Next account/)).toBeInTheDocument()

        expect(res.container).toMatchSnapshot()
      })
    })
  })

  test('it displays the selected account when showSelectedACcount is passed', async () => {
    const { Tree } = composeMockAppTree('multiAccount')
    await act(async () => {
      let res = render(
        <MockedProvider mocks={apolloMocks}>
          <Tree>
            <AccountSelector
              title='Select Account'
              helperText=''
              coinType={CoinType.TEST}
              onSelectAccount={() => {}}
              showSelectedAccount
            />
          </Tree>
        </MockedProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('selected-account')).toBeInTheDocument()
        expect(res.container).toMatchSnapshot()
      })
    })
  })
})
