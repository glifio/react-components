import React from 'react'
import { render, act, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ThemeProvider from '../../../ThemeProvider'
import theme from '../../../theme'
import MessageHistory from '.'
import { WALLET_ADDRESS } from '../../../../test-utils/constants'

jest.mock('dayjs')

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
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <MessageHistory
              offset={0}
              address={WALLET_ADDRESS}
              cidHref={cid => `/message/?cid=${cid}`}
              warnMissingData
            />
          </ThemeProvider>
        </MockedProvider>
      )
      container = res.container
    })

    expect(screen.getByText(/No records found/))
    expect(screen.getByText(/Limited Historical Data/))
    expect(container).toMatchSnapshot()
  })
})
