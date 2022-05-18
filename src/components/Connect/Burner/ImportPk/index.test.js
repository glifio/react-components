import { cleanup, render, screen, act, fireEvent } from '@testing-library/react'
import composeMockAppTree from '../../../../test-utils/composeMockAppTree'
import { flushPromises } from '../../../../test-utils'

import ImportPrivateKey from '.'
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

  test('it renders step one correctly correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportPrivateKey next={nextSpy} back={backSpy} />
      </Tree>
    )
    expect(
      screen.getByText(
        /We do not recommend you use this burner wallet to hold or transact significant sums of Filecoin/
      )
    ).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders step two correctly correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    let res
    act(() => {
      res = render(
        <Tree>
          <ImportPrivateKey next={nextSpy} back={backSpy} />
        </Tree>
      )

      fireEvent.click(screen.getByText('I Understand'))
    })

    expect(
      screen.getByText(/Please input your private key below/)
    ).toBeInTheDocument()
    expect(res.container.firstChild).toMatchSnapshot()
  })

  test('it sends the user to wallet view, with a wallet in state upon successful config', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <ImportPrivateKey next={nextSpy} back={backSpy} />
      </Tree>
    )

    await act(async () => {
      fireEvent.click(screen.getByText('I Understand'))
      await flushPromises()

      fireEvent.change(screen.getByPlaceholderText('Your private key'), {
        target: { value: 'private key string' }
      })
      await flushPromises()

      fireEvent.click(screen.getByText('Next'))
      await flushPromises()
    })
    expect(container.firstChild).toMatchSnapshot()
    expect(nextSpy).toHaveBeenCalled()
    expect(mockFetchDefaultWallet).toHaveBeenCalled()
    const wallet = getWalletProviderState().wallets[0]
    expect(wallet.address).toBeTruthy()
    expect(wallet.path).toBe(createPath(TESTNET_PATH_CODE, 0))
  })
})
