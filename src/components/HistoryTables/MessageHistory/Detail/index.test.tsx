import React from 'react'
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react'
import MessageDetail from '.'
import {
  WALLET_ADDRESS,
  WALLET_ADDRESS_2,
  WALLET_ID,
  WALLET_ID_2
} from '../../../../test-utils/constants'
import { GqlMessage } from '../../../../customPropTypes'
import { StateReplayDocument } from '../../../../generated/graphql'
import { TestEnvironment } from '../../../../test-utils/TestEnvironment'

jest
  .spyOn(require('../hooks/useMethodName'), 'useMethodName')
  .mockImplementation(() => 'send')

const speedUpBtnText = 'Speed up'
const cancelBtnText = 'Cancel'
const seeMoreBtnText = 'Click to see more ↓'
const statusLabelText = 'Status and Confirmations'
const txID = 'bafy2bzaced3ub5g4v35tj7n74zsog3dmcum4tk4qmchbhjx7q747jghal3l4g'

const message: GqlMessage = {
  cid: txID,
  from: {
    id: WALLET_ID,
    robust: WALLET_ADDRESS
  },
  to: {
    id: WALLET_ID_2,
    robust: WALLET_ADDRESS_2
  },
  nonce: 1,
  height: 0,
  method: 0,
  params: '',
  value: '1000',
  gasFeeCap: '100',
  gasLimit: 1000,
  gasPremium: '1'
}

describe('Message detail view', () => {
  test('it renders the loading view correctly', () => {
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useMessage')
      .mockImplementation(() => {
        return {
          message: undefined,
          loading: true,
          error: undefined,
          pending: false
        }
      })

    let container

    act(() => {
      const res = render(
        <TestEnvironment withApollo>
          <MessageDetail
            txID={txID}
            speedUpHref='/speed-up'
            cancelHref='/cancel'
          />
        </TestEnvironment>
      )
      container = res.container
    })

    expect(
      screen.getByText(`Searching for ${txID}... Give us a moment`)
    ).toBeInTheDocument()

    // The document should not contain
    expect(screen.queryByText(speedUpBtnText)).toBeNull()
    expect(screen.queryByText(cancelBtnText)).toBeNull()

    expect(container).toMatchSnapshot()
  })

  test('it renders the not found state correctly', () => {
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useMessage')
      .mockImplementation(() => {
        return {
          message: undefined,
          loading: false,
          error: undefined,
          pending: false
        }
      })

    let container

    act(() => {
      const res = render(
        <TestEnvironment withApollo>
          <MessageDetail
            txID={txID}
            speedUpHref='/speed-up'
            cancelHref='/cancel'
          />
        </TestEnvironment>
      )
      container = res.container
    })

    expect(screen.getByText(`Message ${txID} not found.`)).toBeInTheDocument()

    // The document should not contain
    expect(screen.queryByText(speedUpBtnText)).toBeNull()
    expect(screen.queryByText(cancelBtnText)).toBeNull()

    expect(container).toMatchSnapshot()
  })

  test('it renders the pending msg state correctly', async () => {
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useMessage')
      .mockImplementation(() => {
        return {
          message,
          loading: false,
          error: undefined,
          pending: true
        }
      })

    let container

    await act(async () => {
      const res = render(
        <TestEnvironment withApollo>
          <MessageDetail
            txID={txID}
            speedUpHref='/speed-up'
            cancelHref='/cancel'
          />
        </TestEnvironment>
      )
      container = res.container
    })

    await waitFor(() => {
      expect(screen.getByText(/Message Overview/)).toBeInTheDocument()
      expect(screen.getByText(/CID/)).toBeInTheDocument()
      expect(screen.getByText(/Height/)).toBeInTheDocument()
      expect(screen.getByText(/Timestamp/)).toBeInTheDocument()
      expect(screen.getByText(/From/)).toBeInTheDocument()
      expect(screen.getByText(/To/)).toBeInTheDocument()
      expect(screen.getByText(/Value/)).toBeInTheDocument()
      expect(screen.getByText(/SEND/)).toBeInTheDocument()
      expect(screen.getAllByText(/Pending/).length > 0).toBeTruthy()

      // speed up and cancel buttons should display when pending
      expect(screen.getByText(speedUpBtnText)).toBeInTheDocument()
      expect(screen.getByText(cancelBtnText)).toBeInTheDocument()

      // The document should not contain
      expect(screen.queryByText(statusLabelText)).toBeNull()
      expect(screen.queryByText(seeMoreBtnText)).toBeNull()

      expect(container).toMatchSnapshot()
    })
  })

  test('it renders the confirmed but not executed msg state correctly', async () => {
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useMessage')
      .mockImplementation(() => {
        return {
          message,
          loading: false,
          error: undefined,
          pending: false
        }
      })

    let container

    await act(async () => {
      const res = render(
        <TestEnvironment withApollo>
          <MessageDetail
            txID={txID}
            speedUpHref='/speed-up'
            cancelHref='/cancel'
            confirmations={50}
          />
        </TestEnvironment>
      )
      container = res.container
    })

    await waitFor(() => {
      expect(screen.getByText(/Message Overview/)).toBeInTheDocument()
      expect(screen.getByText(/CID/)).toBeInTheDocument()
      expect(screen.getByText(/Height/)).toBeInTheDocument()
      expect(screen.getByText(/Timestamp/)).toBeInTheDocument()
      expect(screen.getByText(/From/)).toBeInTheDocument()
      expect(screen.getByText(/To/)).toBeInTheDocument()
      expect(screen.getByText(/Value/)).toBeInTheDocument()
      expect(screen.getByText(/SEND/)).toBeInTheDocument()

      // The document should not contain
      expect(screen.queryByText(statusLabelText)).toBeNull()
      expect(screen.queryByText(seeMoreBtnText)).toBeNull()
      expect(screen.queryByText(speedUpBtnText)).toBeNull()
      expect(screen.queryByText(cancelBtnText)).toBeNull()

      expect(container).toMatchSnapshot()
    })
  })

  test('it renders the executed msg state correctly (with no return vals)', async () => {
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useMessage')
      .mockImplementation(() => {
        return {
          message: { ...message, height: 100 },
          loading: false,
          error: undefined,
          pending: false
        }
      })

    let container

    await act(async () => {
      const res = render(
        <TestEnvironment
          withApollo
          apolloMocks={[
            {
              request: {
                query: StateReplayDocument,
                variables: {
                  cid: txID
                }
              },
              result: {
                data: {
                  stateReplay: {
                    gasCost: {
                      gasUsed: 100,
                      baseFeeBurn: '100',
                      minerPenalty: '100',
                      minerTip: '100',
                      overEstimationBurn: '100',
                      refund: '100',
                      totalCost: '100'
                    },
                    receipt: {
                      exitCode: 0,
                      return: '',
                      gasUsed: 100
                    },
                    executionTrace: {
                      executionTrace: {
                        Duration: 1468352,
                        Error: '',
                        GasCharges: null,
                        Msg: {
                          CID: {
                            '/': 'bafy2bzacedypi4a2z4x74dd2aelkxn44m5hylbcrlwxzqlwarkbl223qqmehk'
                          },
                          From: 't13koa6kz5otquokcgwusvtsxcdymuq7lqe4twb4i',
                          GasFeeCap: '100401',
                          GasLimit: 20487316,
                          GasPremium: '99347',
                          Method: 2,
                          Nonce: 267,
                          Params:
                            'gtgqWCcAAVWg5AIgveswPFOPTNaXlRZxGRZNPygpY7FexhrfGENjM6vXf8hYG4SBVQHanA8rPXThRyhGtSVZyuIeGUh9cAEAAA==',
                          To: 't01',
                          Value: '1000000000000000000',
                          Version: 0
                        },

                        MsgRct: {
                          ExitCode: 0,
                          GasUsed: 16389853,
                          Return: ''
                        },

                        Subcalls: null
                      }
                    }
                  }
                }
              }
            }
          ]}
        >
          <MessageDetail
            txID={txID}
            speedUpHref='/speed-up'
            cancelHref='/cancel'
            confirmations={50}
          />
        </TestEnvironment>
      )
      container = res.container
    })

    // once the gas and receipt information load, this should get enabled
    await waitFor(() => {
      expect(screen.getByText(seeMoreBtnText))
    })

    act(() => {
      fireEvent.click(screen.getByText(seeMoreBtnText))
    })

    await waitFor(() => {
      expect(screen.getByText(/Message Overview/)).toBeInTheDocument()
      expect(screen.getByText(/CID/)).toBeInTheDocument()
      expect(screen.getByText(/Height/)).toBeInTheDocument()
      expect(screen.getByText(/Timestamp/)).toBeInTheDocument()
      expect(screen.getByText(/From/)).toBeInTheDocument()
      expect(screen.getByText(/To/)).toBeInTheDocument()
      expect(screen.getByText(/Value/)).toBeInTheDocument()
      expect(screen.getByText(/SEND/)).toBeInTheDocument()
      expect(screen.getByText(/Gas Limit & Usage by Txn/)).toBeInTheDocument()
      expect(screen.getByText(/Gas Fees/)).toBeInTheDocument()
      expect(screen.getByText(/Fee Cap/)).toBeInTheDocument()
      expect(screen.getByText(/Base/)).toBeInTheDocument()
      expect(screen.getByText(/Gas Burned/)).toBeInTheDocument()

      // The document should not contain
      expect(screen.queryByText(speedUpBtnText)).toBeNull()
      expect(screen.queryByText(cancelBtnText)).toBeNull()

      expect(container).toMatchSnapshot()
    })
  })
})
