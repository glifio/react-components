import { cleanup, render, screen, act, fireEvent } from '@testing-library/react'
import composeMockAppTree from '../../../../test-utils/composeMockAppTree'
import { flushPromises } from '../../../../test-utils'

import ImportMnemonic from '.'
import { TESTNET_PATH_CODE } from '../../../../constants'
import { mockFetchDefaultWallet } from '../../../../test-utils/composeMockAppTree/createWalletProviderContextFuncs'
import createPath from '../../../../utils/createPath'

describe('Import seed phrase configuration', () => {
  let backSpy, nextSpy
  beforeEach(() => {
    backSpy = jest.fn()
    nextSpy = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })
  test('it renders step one correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportMnemonic next={nextSpy} back={backSpy} />
      </Tree>
    )

    expect(
      screen.getByText(
        /We do not recommend you use this burner wallet to hold or transact significant sums of Filecoin/
      )
    ).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders step one correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportMnemonic next={nextSpy} back={backSpy} />
      </Tree>
    )
    act(() => {
      fireEvent.click(screen.getByText('I Understand'))
    })
    expect(screen.getByText(/Input, Import & Proceed/)).toBeInTheDocument()
    expect(
      screen.getByText(/Please input your seed phrase below to continue/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Show/)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it sends the user to wallet view, with a wallet in state upon successful config', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportMnemonic next={nextSpy} back={backSpy} />
      </Tree>
    )

    await act(async () => {
      fireEvent.click(screen.getByText('I Understand'))
      await flushPromises()

      fireEvent.change(screen.getByPlaceholderText('Your seed phrase'), {
        target: {
          value:
            'slender spread awkward chicken noise useful thank dentist tip bronze ritual explain version spot collect whisper glow peanut bus local country album punch frown'
        }
      })
      await flushPromises()

      fireEvent.click(screen.getByText('Next'))
      await flushPromises()
    })
    expect(nextSpy).toHaveBeenCalled()
    expect(mockFetchDefaultWallet).toHaveBeenCalled()
    const wallet = getWalletProviderState().wallets[0]
    expect(wallet.address).toBeTruthy()
    expect(wallet.path).toBe(createPath(TESTNET_PATH_CODE, 0))
    expect(container.firstChild).toMatchSnapshot()
  })
})
