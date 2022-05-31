import {
  cleanup,
  render,
  getByText,
  act,
  fireEvent,
  getAllByRole
} from '@testing-library/react'
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
  test('it renders correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportMnemonic next={nextSpy} back={backSpy} />
      </Tree>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('it sends the user to wallet view, with a wallet in state upon successful config', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportMnemonic next={nextSpy} back={backSpy} />
      </Tree>
    )

    const [seed] = getAllByRole(container, 'textbox')
    await act(async () => {
      fireEvent.change(seed, {
        target: {
          value:
            'slender spread awkward chicken noise useful thank dentist tip bronze ritual explain version spot collect whisper glow peanut bus local country album punch frown'
        }
      })
      await flushPromises()
      // if we dont flush twice, the isValid hook doesnt rerender into a true state
      await flushPromises()

      fireEvent.click(getByText(container, 'Connect'))
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
