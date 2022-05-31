import {
  cleanup,
  render,
  screen,
  act,
  fireEvent,
  getAllByRole
} from '@testing-library/react'
import composeMockAppTree from '../../../../test-utils/composeMockAppTree'
import { flushPromises } from '../../../../test-utils'

import { ImportPk } from '.'
import { TESTNET_PATH_CODE } from '../../../../constants'
import { mockFetchDefaultWallet } from '../../../../test-utils/composeMockAppTree/createWalletProviderContextFuncs'
import createPath from '../../../../utils/createPath'

describe('Import private key configuration', () => {
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
        <ImportPk next={nextSpy} back={backSpy} />
      </Tree>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it sends the user to wallet view, with a wallet in state upon successful config', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportPk next={nextSpy} back={backSpy} />
      </Tree>
    )

    const [pk] = getAllByRole(container, 'textbox')
    await act(async () => {
      fireEvent.change(pk, {
        target: { value: '+UXJi0663hCExYMxiib9J+wKyFWiii51jnG7WXkeAw0=' }
      })
      await flushPromises()
      await flushPromises()

      fireEvent.click(screen.getByText('Connect'))
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
