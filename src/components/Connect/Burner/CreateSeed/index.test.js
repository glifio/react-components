import { render, screen, act, fireEvent } from '@testing-library/react'
import composeMockAppTree from '../../../../test-utils/composeMockAppTree'

import { CreateSeed } from '.'
import { TESTNET_PATH_CODE } from '../../../../constants'
import { mockFetchDefaultWallet } from '../../../../test-utils/composeMockAppTree/createWalletProviderContextFuncs'
import createPath from '../../../../utils/createPath'

const backSpy = jest.fn()
const nextSpy = jest.fn()

describe('Create seed phrase configuration', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn()
  })

  test('it renders step 1 correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    render(
      <Tree>
        <CreateSeed initialWalkthroughStep={1} next={nextSpy} back={backSpy} />
      </Tree>
    )

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
        <CreateSeed initialWalkthroughStep={2} next={nextSpy} back={backSpy} />
      </Tree>
    )

    expect(
      screen.getByText(/Add the correct words to the empty inputs/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Step 2/)).toBeInTheDocument()
  })

  test('it renders step 3 correctly', () => {
    const { Tree } = composeMockAppTree('preOnboard')

    render(
      <Tree>
        <CreateSeed initialWalkthroughStep={3} next={nextSpy} back={backSpy} />
      </Tree>
    )

    expect(
      screen.getByText(/Success! Please click 'Next' to access your wallet./)
    ).toBeInTheDocument()
    expect(screen.getByText(/Step 3/)).toBeInTheDocument()
  })

  test('it sends the user to wallet view, with a wallet in state upon successful config', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('preOnboard')

    const { container } = render(
      <Tree>
        <CreateSeed initialWalkthroughStep={3} next={nextSpy} back={backSpy} />
      </Tree>
    )

    await act(async () => {
      fireEvent.click(screen.getByText('Next'))
    })
    expect(container.firstChild).toMatchSnapshot()
    expect(mockFetchDefaultWallet).toHaveBeenCalled()
    expect(nextSpy).toHaveBeenCalled()
    const wallet = getWalletProviderState().wallets[0]
    expect(wallet.address).toBeTruthy()
    expect(wallet.path).toBe(createPath(TESTNET_PATH_CODE, 0))
  })
})
