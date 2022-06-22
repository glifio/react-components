import {
  render,
  getByRole,
  getByText,
  act,
  fireEvent
} from '@testing-library/react'
import composeMockAppTree from '../../../../test-utils/composeMockAppTree'

import { ImportPk } from '.'
import { TESTNET_PATH_CODE } from '../../../../constants'
import { mockFetchDefaultWallet } from '../../../../test-utils/composeMockAppTree/createWalletProviderContextFuncs'
import createPath from '../../../../utils/createPath'

const backSpy = jest.fn()
const nextSpy = jest.fn()

describe('Import private key configuration', () => {
  test('it renders correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportPk next={nextSpy} back={backSpy} />
      </Tree>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('it sends the user to wallet view, with a wallet in state upon successful config', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('preOnboard')
    let result = null

    await act(async () => {
      result = render(
        <Tree>
          <ImportPk next={nextSpy} back={backSpy} />
        </Tree>
      )

      // Get HTML elements
      const pk = getByRole(result.container, 'textbox')
      const connect = getByText(result.container, 'Connect')

      // Check initial state
      expect(pk).toHaveDisplayValue('')
      expect(connect).toBeDisabled()

      // Enter private key
      fireEvent.change(pk, {
        target: { value: '+UXJi0663hCExYMxiib9J+wKyFWiii51jnG7WXkeAw0=' }
      })
      jest.runAllTimers()

      // Connect should now be enabled
      expect(connect).toBeEnabled()

      // Click Connect
      fireEvent.click(connect)
    })

    expect(nextSpy).toHaveBeenCalled()
    expect(mockFetchDefaultWallet).toHaveBeenCalled()
    const wallet = getWalletProviderState().wallets[0]
    expect(wallet.address).toBeTruthy()
    expect(wallet.path).toBe(createPath(TESTNET_PATH_CODE, 0))
    expect(result.container.firstChild).toMatchSnapshot()
  })
})
