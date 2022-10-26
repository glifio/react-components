import React from 'react'
import { render, act, screen } from '@testing-library/react'
import { MessageHistoryTable } from '.'
import {
  WALLET_ADDRESS,
  WALLET_ADDRESS_2,
  WALLET_ID,
  WALLET_ID_2
} from '../../../../test-utils/constants'
import { GqlMessagesMsg } from '../../../../customPropTypes'
import { TestEnvironment } from '../../../../test-utils/TestEnvironment'

jest
  .spyOn(require('../../../../utils/useAge'), 'useAge')
  .mockImplementation(() => ({
    age: '2022-08-02 09:50:30',
    loading: false,
    error: null
  }))

jest
  .spyOn(require('../hooks/useMethodName'), 'useMethodName')
  .mockImplementation(() => 'send')

describe('Message history', () => {
  test('it renders no message history correctly with historical data missing warning', async () => {
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useAllMessages')
      .mockImplementation(() => {
        return {
          error: undefined,
          loading: false,
          fetchMore: () => {},
          fetchingMore: false,
          pendingMsgs: [],
          messages: [],
          lastPage: true
        }
      })

    let container

    act(() => {
      const res = render(
        <TestEnvironment withApollo>
          <MessageHistoryTable
            offset={0}
            address={WALLET_ADDRESS}
            txIDHref={txID => `/message/?cid=${txID}`}
            warnMissingData
          />
        </TestEnvironment>
      )
      container = res.container
    })

    expect(screen.getByText(/No records found/))
    expect(screen.getByText(/Syncing data from Mainnet/))
    expect(container).toMatchSnapshot()
  })

  test('it renders messages', async () => {
    const makeMessages = (count: number): GqlMessagesMsg[] => {
      const messages: GqlMessagesMsg[] = []
      for (let i = 0; i < count; i++) {
        messages.push({
          cid: `bafy2bzaced3ub5g4v35tj7n74zsog3dmcum4tk${i}qmchbhjx7q747jghal3l4g`,
          to: {
            id: WALLET_ID_2,
            robust: WALLET_ADDRESS_2
          },
          from: {
            id: WALLET_ID,
            robust: WALLET_ADDRESS
          },
          nonce: i,
          height: 1020,
          method: 0,
          params: '',
          value: '1000'
        })
      }
      return messages
    }
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useAllMessages')
      .mockImplementation(() => {
        return {
          error: undefined,
          loading: false,
          fetchMore: () => {},
          fetchingMore: false,
          pendingMsgs: [],
          messages: makeMessages(5),
          lastPage: true
        }
      })

    let container

    act(() => {
      const res = render(
        <TestEnvironment withApollo>
          <MessageHistoryTable
            offset={0}
            address={WALLET_ADDRESS}
            txIDHref={txID => `/message/?txID=${txID}`}
            warnMissingData
          />
        </TestEnvironment>
      )
      container = res.container
    })

    expect(screen.getByText(/Transaction History/))
    expect(screen.getByText(/Syncing data from Mainnet/))
    expect(container).toMatchSnapshot()
  })
})
