import { FilecoinNumber } from '@glif/filecoin-number'
import { cleanup, render, screen } from '@testing-library/react'
import { RequireWallet } from './'
import { SINGLE_KEY } from '../../constants'

const useWalletMock = jest.spyOn(
  require('../WalletProvider/useWallet'),
  'default'
)
const defaultWallet = {
  address: 't1jdlfl73voaiblrvn2yfivvn5ifucwwv5f26nfza',
  balance: new FilecoinNumber('1', 'fil'),
  path: SINGLE_KEY
}

describe('RequireWallet', () => {
  beforeEach(jest.clearAllMocks)
  afterEach(cleanup)

  test('it renders its children when a valid wallet is passed as a prop', async () => {
    useWalletMock.mockImplementation(() => defaultWallet)
    render(
      <RequireWallet gatekeep={() => {}}>
        <div>Yo</div>
      </RequireWallet>
    )

    expect(screen.getByText('Yo')).toBeInTheDocument()
  })

  test('it calls the gatekeep when no wallet exists', () => {
    useWalletMock.mockImplementation(() => ({
      address: '',
      balance: new FilecoinNumber('0', 'fil'),
      path: ''
    }))
    const gatekeepSpy = jest.fn()
    render(
      <RequireWallet gatekeep={gatekeepSpy}>
        <div>Yo</div>
      </RequireWallet>
    )

    expect(gatekeepSpy).toHaveBeenCalled()
  })
})
