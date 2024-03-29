import { FilecoinNumber } from '@glif/filecoin-number'
import { Message } from '@glif/filecoin-message'

export * from '../../node_modules/@glif/filecoin-wallet-provider/dist/errors'
export * from '../../node_modules/@glif/filecoin-wallet-provider/dist/providers/metamask-provider'

export const mockGetAccounts = jest
  .fn()
  .mockImplementation((start = 0, end = 1) => {
    if (end > 10)
      throw new Error('Cannot generate a valid account address with an index of 10 or higher')
    const accounts = []
    for (let i = start; i < end; i++) {
      accounts.push(`t1mbk7q6gm4rjlndfqw6f2vkfgqotres3fgicb${i}uq`)
    }
    return Promise.resolve(accounts)
  })

const mockGetBalance = jest
  .fn()
  .mockImplementation(() => Promise.resolve(new FilecoinNumber('1', 'fil')))

const mockSimulateMessage = jest
  .fn()
  .mockImplementation(() => Promise.resolve(true))

const mockSuprovider = {
  type: 'MOCK',
  getAccounts: mockGetAccounts,
  sign: jest.fn().mockImplementation(() => 'xxxyyyyzzzz')
}

const mockRequest = jest.fn().mockImplementation(method => {
  switch (method) {
    case 'ChainHead': {
      return { Height: 1000 }
    }
    default: {
      return
    }
  }
})

class MockWalletProvider {
  constructor(subprovider = mockSuprovider) {
    this.wallet = subprovider
    this.jsonRpcEngine = {
      request: mockRequest
    }
  }

  getBalance = mockGetBalance
  getNonce = jest.fn().mockImplementation(() => 0)
  gasEstimateMessageGas = jest.fn().mockImplementation(
    ({ To, From, Value, Method, Nonce, Params }) =>
      new Message({
        to: To,
        from: From,
        value: Value,
        gasPremium: '1',
        gasFeeCap: '1',
        gasLimit: 10000000,
        method: Method,
        nonce: Nonce,
        params: Params
      })
  )
  gasCalcTxFee = jest
    .fn()
    .mockImplementation(async () => new FilecoinNumber('1000000', 'attofil'))
  gasEstimateMaxFee = jest.fn().mockImplementation(async message => ({
    maxFee: new FilecoinNumber('1000000', 'attofil'),
    message: { ...message, GasLimit: 1, GasFeeCap: '1', GasPremium: '1' }
  }))
  sendMessage = jest.fn().mockImplementation(() => ({ '/': 'QmZCid!' }))
  simulateMessage = mockSimulateMessage
}

export const mockWalletProviderInstance = new MockWalletProvider()

export class TransportWrapper {
  transport = null
  checkSupport = jest.fn().mockImplementation(() => true)
  disconnect = jest.fn()
  connect = jest.fn()
}

export const HDWalletProvider = MockWalletProvider
export const SECP256K1KeyProvider = MockWalletProvider
export const LedgerProvider = MockWalletProvider

export default MockWalletProvider
