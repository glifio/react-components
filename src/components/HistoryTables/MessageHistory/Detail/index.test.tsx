import React from 'react'
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ThemeProvider from '../../../ThemeProvider'
import theme from '../../../theme'
import MessageDetail from '.'
import {
  WALLET_ADDRESS,
  WALLET_ADDRESS_2,
  WALLET_ID,
  WALLET_ID_2
} from '../../../../test-utils/constants'
import {
  GasCostDocument,
  MessageReceiptDocument
} from '../../../../generated/graphql'
import { TestEnvironment } from '../../../../test-utils/TestEnvironment'

jest
  .spyOn(require('../hooks/useMethodName'), 'useMethodName')
  .mockImplementation(() => {
    return {
      methodName: 'send',
      actorName: 'account'
    }
  })

const speedUpBtnText = 'Speed up'
const cancelBtnText = 'Cancel'
const seeMoreBtnText = 'Click to see more ↓'
const statusLabelText = 'Status and Confirmations'
const cid = 'bafy2bzaced3ub5g4v35tj7n74zsog3dmcum4tk4qmchbhjx7q747jghal3l4g'

const message = {
  cid,
  from: {
    id: WALLET_ID,
    robust: WALLET_ADDRESS
  },
  to: {
    id: WALLET_ID_2,
    robust: WALLET_ADDRESS_2
  },
  gasFeeCap: '100',
  gasLimit: 1000,
  gasPremium: '1',
  height: 0,
  nonce: 1,
  params: '',
  value: '1000',
  version: '1',
  method: '0'
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
        <TestEnvironment>
          <MockedProvider>
            <ThemeProvider theme={theme}>
              <MessageDetail
                cid={cid}
                speedUpHref='/speed-up'
                cancelHref='/cancel'
              />
            </ThemeProvider>
          </MockedProvider>
        </TestEnvironment>
      )
      container = res.container
    })

    expect(
      screen.getByText(`Searching for ${cid}... Give us a moment`)
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
        <TestEnvironment>
          <MockedProvider>
            <ThemeProvider theme={theme}>
              <MessageDetail
                cid={cid}
                speedUpHref='/speed-up'
                cancelHref='/cancel'
              />
            </ThemeProvider>
          </MockedProvider>
        </TestEnvironment>
      )
      container = res.container
    })

    expect(screen.getByText(`Message ${cid} not found.`)).toBeInTheDocument()

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
        <TestEnvironment>
          <MockedProvider>
            <ThemeProvider theme={theme}>
              <MessageDetail
                cid={cid}
                speedUpHref='/speed-up'
                cancelHref='/cancel'
              />
            </ThemeProvider>
          </MockedProvider>
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
        <TestEnvironment>
          <MockedProvider>
            <ThemeProvider theme={theme}>
              <MessageDetail
                cid={cid}
                speedUpHref='/speed-up'
                cancelHref='/cancel'
                confirmations={50}
              />
            </ThemeProvider>
          </MockedProvider>
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

  test('it renders the executed msg state correctly', async () => {
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
        <TestEnvironment>
          <MockedProvider
            mocks={[
              {
                request: {
                  query: GasCostDocument,
                  variables: {
                    cid
                  }
                },
                result: {
                  data: {
                    gascost: {
                      gasUsed: 100,
                      baseFeeBurn: '100',
                      minerPenalty: '100',
                      minerTip: '100',
                      overEstimationBurn: '100',
                      refund: '100',
                      totalCost: '100'
                    }
                  }
                }
              },
              {
                request: {
                  query: MessageReceiptDocument,
                  variables: {
                    cid
                  }
                },
                result: {
                  data: {
                    receipt: {
                      exitCode: 0,
                      return: '',
                      gasUsed: 100
                    }
                  }
                }
              }
            ]}
          >
            <ThemeProvider theme={theme}>
              <MessageDetail
                cid={cid}
                speedUpHref='/speed-up'
                cancelHref='/cancel'
                confirmations={50}
              />
            </ThemeProvider>
          </MockedProvider>
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
