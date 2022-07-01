import React from 'react'
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react'
import { CoinType } from '@glif/filecoin-address'
import AccountSelector from '.'
import HelperText from './HelperText'

import ThemeProvider from '../ThemeProvider'
import theme from '../theme'
import composeMockAppTree from '../../test-utils/composeMockAppTree'
import { MockedProvider } from '@apollo/client/testing'
import { AddressDocument } from '../../generated/graphql'
import { mockGetAccounts } from '../../../__mocks__/@glif/filecoin-wallet-provider'

jest.mock('../../services/WalletProvider')

// eslint-disable-next-line
function expectAllAccountsInView(screen) {
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      expect(screen.getByText('Default')).toBeInTheDocument()
    } else expect(screen.getByText(`Account ${i}`)).toBeInTheDocument()
  }
}

describe('AccountSelector', () => {
  let mocks = []
  beforeAll(async () => {
    const accounts = await mockGetAccounts(0, 10)
    mocks = accounts.map((address, i) => {
      return {
        request: {
          query: AddressDocument,
          variables: {
            address
          }
        },
        result: {
          data: {
            address: {
              robust: address,
              id: `t010${i}`
            }
          }
        }
      }
    })
  })

  test('it renders the loading screen first', async () => {
    const { Tree } = composeMockAppTree('postOnboard')
    await act(async () => {
      let res = render(
        <MockedProvider mocks={mocks}>
          <Tree>
            <AccountSelector
              test
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

  test('it renders the wallets in state with the title, helperText, and option to create next wallet', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('postOnboard')
    const title = 'Please select an account.'
    const helperText =
      "Your single seed phrase creates hundreds of individual accounts. We're showing you the first 5."
    let res
    await act(async () => {
      res = render(
        <MockedProvider mocks={mocks}>
          <Tree>
            <AccountSelector
              test
              title={title}
              helperText={helperText}
              coinType={CoinType.TEST}
              onSelectAccount={() => {}}
            />
          </Tree>
        </MockedProvider>
      )
    })

    waitFor(() => {
      expectAllAccountsInView(screen)
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(helperText)).toBeInTheDocument()
      // IMPORTANT; the the X button alone is the 0th child, so we assert against the first child
      expect(getWalletProviderState().wallets.length).toBe(5)
      getWalletProviderState().wallets.forEach((w, i) => {
        expect(Number(w.path.split('/')[5])).toBe(Number(i))
      })
      expect(res.container).toMatchSnapshot()
    })
  })

  test('it adds a wallet to state upon create', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('postOnboard')
    await act(async () => {
      render(
        <MockedProvider mocks={mocks}>
          <Tree>
            <AccountSelector
              test
              title='Switch Accounts'
              helperText="Your single seed phrase creates hundreds of individual accounts. We're showing you the first 5."
              coinType={CoinType.TEST}
              onSelectAccount={() => {}}
            />
          </Tree>
        </MockedProvider>
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Create')).toBeInTheDocument()
    })

    await act(async () => {
      await fireEvent.click(screen.getByText('Create'))
    })

    await waitFor(() => {
      expect(getWalletProviderState().wallets.length).toBe(6)
      expect(screen.getByDisplayValue('6')).toBeInTheDocument()
    })
  })

  test('it adds the correct wallet to state upon create', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('postOnboard')
    const index = 8
    await act(async () => {
      render(
        <MockedProvider mocks={mocks}>
          <Tree>
            <AccountSelector
              test
              title='Switch Accounts'
              helperText="Your single seed phrase creates hundreds of individual accounts. We're showing you the first 5."
              coinType={CoinType.TEST}
              onSelectAccount={() => {}}
            />
          </Tree>
        </MockedProvider>
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Legacy address')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Legacy address'))
      await fireEvent.change(screen.getByDisplayValue(/5/), {
        target: { value: index },
        preventDefault: () => {}
      })
    })

    await act(async () => {
      await fireEvent.click(screen.getByText('Create'))
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue('6')).toBeInTheDocument()
    })

    const wallets = getWalletProviderState().wallets
    expect(wallets.length).toBe(6)
    expect(Number(wallets[wallets.length - 1].path.split('/')[5])).toBe(index)
  })
})

describe('HelperText', () => {
  test('it renders the right text', () => {
    const { container } = render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <HelperText text='Test text' />
        </ThemeProvider>
      </MockedProvider>
    )

    expect(screen.getByText('Test text')).toBeInTheDocument()
    expect(
      screen.getByText("Don't see an account you're looking for?")
    ).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
