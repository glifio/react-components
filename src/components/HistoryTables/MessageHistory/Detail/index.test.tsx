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

jest
  .spyOn(require('../useMethodName'), 'useMethodName')
  .mockImplementation(() => {
    return {
      methodName: 'send',
      actorName: 'account'
    }
  })

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

const expectElementDNE = (text: string) => {
  try {
    screen.getByText(text, { exact: false })
  } catch (err) {
    expect(
      err.message.includes(`Unable to find an element with the text: ${text}.`)
    ).toBeTruthy()
  }
}

describe('Message detail view', () => {
  test('it renders the loading view correctly', () => {
    jest
      .spyOn(require('../../useAllMessages'), 'useMessage')
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
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <MessageDetail
              cid={cid}
              speedUpHref='/speed-up'
              cancelHref='/cancel'
            />
          </ThemeProvider>
        </MockedProvider>
      )
      container = res.container
    })

    expect(
      screen.getByText(`Searching for ${cid}... Give us a moment`)
    ).toBeInTheDocument()
    // couldnt figure out a better way to assert the speed up and cancel buttons are not display in loading state, but this is not great if we ever change names of Cancel and Speed up ButtonV2Links
    expectElementDNE('Speed up')
    expectElementDNE('Cancel')
    expect(container).toMatchSnapshot()
  })

  test('it renders the not found state correctly', () => {
    jest
      .spyOn(require('../../useAllMessages'), 'useMessage')
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
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <MessageDetail
              cid={cid}
              speedUpHref='/speed-up'
              cancelHref='/cancel'
            />
          </ThemeProvider>
        </MockedProvider>
      )
      container = res.container
    })

    expect(screen.getByText(`Message ${cid} not found.`)).toBeInTheDocument()
    expectElementDNE('Speed up')
    expectElementDNE('Cancel')
    expect(container).toMatchSnapshot()
  })

  test('it renders the pending msg state correctly', async () => {
    jest
      .spyOn(require('../../useAllMessages'), 'useMessage')
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
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <MessageDetail
              cid={cid}
              speedUpHref='/speed-up'
              cancelHref='/cancel'
            />
          </ThemeProvider>
        </MockedProvider>
      )
      container = res.container
    })

    await waitFor(() => {
      expect(screen.getByText(/Message Overview/)).toBeInTheDocument()
      expect(screen.getByText(/Cid/)).toBeInTheDocument()
      expect(screen.getByText(/Height/)).toBeInTheDocument()
      expect(screen.getByText(/Timestamp/)).toBeInTheDocument()
      expect(screen.getByText(/From/)).toBeInTheDocument()
      expect(screen.getByText(/To/)).toBeInTheDocument()
      expect(screen.getByText(/Value/)).toBeInTheDocument()
      //
      expect(screen.getByText(/SEND/)).toBeInTheDocument()
      expect(screen.getAllByText(/Pending/).length > 0).toBeTruthy()
      // speed up and cancel buttons should display when pending
      expect(screen.getByText(/Speed up/)).toBeInTheDocument()
      expect(screen.getByText(/Cancel/)).toBeInTheDocument()

      expectElementDNE('Status and Confirmations')
      expectElementDNE('see more')
      expect(container).toMatchSnapshot()
    })
  })

  test('it renders the confirmed but not executed msg state correctly', async () => {
    jest
      .spyOn(require('../../useAllMessages'), 'useMessage')
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
      )
      container = res.container
    })

    await waitFor(() => {
      expect(screen.getByText(/Message Overview/)).toBeInTheDocument()
      expect(screen.getByText(/Cid/)).toBeInTheDocument()
      expect(screen.getByText(/Height/)).toBeInTheDocument()
      expect(screen.getByText(/Timestamp/)).toBeInTheDocument()
      expect(screen.getByText(/From/)).toBeInTheDocument()
      expect(screen.getByText(/To/)).toBeInTheDocument()
      expect(screen.getByText(/Value/)).toBeInTheDocument()
      //
      expect(screen.getByText(/SEND/)).toBeInTheDocument()

      expectElementDNE('Status and Confirmations')
      expectElementDNE('see more')
      expectElementDNE('Speed up')
      expectElementDNE('Cancel')
      expect(container).toMatchSnapshot()
    })
  })

  test('it renders the executed msg state correctly', async () => {
    jest
      .spyOn(require('../../useAllMessages'), 'useMessage')
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
      )
      container = res.container
    })

    // once the gas and receipt information load, this should get enabled
    await waitFor(() => {
      expect(screen.getByText(/see more/))
    })

    act(() => {
      fireEvent.click(screen.getByText(/see more/))
    })

    await waitFor(() => {
      expect(screen.getByText(/Message Overview/)).toBeInTheDocument()
      expect(screen.getByText(/Cid/)).toBeInTheDocument()
      expect(screen.getByText(/Height/)).toBeInTheDocument()
      expect(screen.getByText(/Timestamp/)).toBeInTheDocument()
      expect(screen.getByText(/From/)).toBeInTheDocument()
      expect(screen.getByText(/To/)).toBeInTheDocument()
      expect(screen.getByText(/Value/)).toBeInTheDocument()
      expect(screen.getByText(/SEND/)).toBeInTheDocument()
      expect(screen.getByText(/Gas limit & usage by txn/)).toBeInTheDocument()
      expect(screen.getByText(/Gas fees/)).toBeInTheDocument()
      expect(screen.getByText(/Fee Cap/)).toBeInTheDocument()
      expect(screen.getByText(/Base/)).toBeInTheDocument()
      expect(screen.getByText(/Gas burned/)).toBeInTheDocument()

      expectElementDNE('Speed up')
      expectElementDNE('Cancel')
      expect(container).toMatchSnapshot()
    })
  })
})
