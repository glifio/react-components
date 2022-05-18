import { cleanup, render, screen, act, fireEvent } from '@testing-library/react'
import composeMockAppTree from '../../../../test-utils/composeMockAppTree'
import { flushPromises } from '../../../../test-utils'

import Create from '.'
import { TESTNET_PATH_CODE } from '../../../../constants'
import { mockFetchDefaultWallet } from '../../../../test-utils/composeMockAppTree/createWalletProviderContextFuncs'
import createPath from '../../../../utils/createPath'

describe('Create seed phrase configuration', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn()
  })

  let backSpy, nextSpy
  beforeEach(() => {
    backSpy = jest.fn()
    nextSpy = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  test('it renders the warning correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <Create initialWalkthroughStep={3} next={nextSpy} back={backSpy} />
      </Tree>
    )
    expect(
      screen.getByText(
        /We do not recommend you use this burner wallet to hold or transact significant sums of Filecoin/
      )
    ).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders step 1 correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    render(
      <Tree>
        <Create initialWalkthroughStep={1} next={nextSpy} back={backSpy} />
      </Tree>
    )
    act(() => {
      fireEvent.click(screen.getByText('I Understand'))
    })
    expect(screen.getByText(/Step 1/)).toBeInTheDocument()
    expect(screen.getByText(/Copy/)).toBeInTheDocument()
    expect(screen.getByText(/Download/)).toBeInTheDocument()
    expect(screen.getByText(/Write down your seed phrase/)).toBeInTheDocument()
    expect(screen.getByText(/I've recorded my seed phrase/)).toBeInTheDocument()
  })

  test('it renders step 2 correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    render(
      <Tree>
        <Create initialWalkthroughStep={2} next={nextSpy} back={backSpy} />
      </Tree>
    )

    act(() => {
      fireEvent.click(screen.getByText('I Understand'))
    })

    expect(
      screen.getByText(/Add the correct words to the empty inputs/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Step 2/)).toBeInTheDocument()
  })

  test('it renders step 3 correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    render(
      <Tree>
        <Create initialWalkthroughStep={3} next={nextSpy} back={backSpy} />
      </Tree>
    )

    act(() => {
      fireEvent.click(screen.getByText('I Understand'))
    })

    expect(
      screen.getByText(/Success! Please click 'Next' to access your wallet./)
    ).toBeInTheDocument()
    expect(screen.getByText(/Step 3/)).toBeInTheDocument()
  })

  test('it sends the user to wallet view, with a wallet in state upon successful config', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <Create initialWalkthroughStep={3} next={nextSpy} back={backSpy} />
      </Tree>
    )

    act(() => {
      fireEvent.click(screen.getByText('I Understand'))
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Next'))
      await flushPromises()
    })
    expect(container.firstChild).toMatchSnapshot()
    expect(mockFetchDefaultWallet).toHaveBeenCalled()
    expect(nextSpy).toHaveBeenCalled()
    const wallet = getWalletProviderState().wallets[0]
    expect(wallet.address).toBeTruthy()
    expect(wallet.path).toBe(createPath(TESTNET_PATH_CODE, 0))
  })
})
