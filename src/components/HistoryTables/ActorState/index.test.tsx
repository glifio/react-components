import React from 'react'
import {
  render,
  act,
  fireEvent,
  RenderResult,
  getByText,
  waitFor
} from '@testing-library/react'

import {
  MULTISIG_ACTOR_ADDRESS,
  MULTISIG_ACTOR_ID
} from '../../../test-utils/constants'
import { TestEnvironment } from '../../../test-utils/TestEnvironment'
import { isAddrEqual } from '../../../utils/isAddrEqual'
import ThemeProvider from '../../ThemeProvider'
import theme from '../../theme'
import { ActorState } from '.'

jest
  .spyOn(require('@glif/filecoin-rpc-client'), 'default')
  .mockImplementation(() => {
    return {
      request: jest.fn(async (method, address) => {
        if (!isAddrEqual(address, MULTISIG_ACTOR_ADDRESS))
          throw new Error('getting actor: actor not found')

        switch (method) {
          case 'StateReadState':
            return {
              Balance: '1000000000000000000',
              Code: {
                '/': 'bafk2bzacec66wmb4kohuzvuxsulhcgiwju7sqkldwfpmmgw7dbbwgm5l2574q'
              },
              State: {
                Signers: ['t014278'],
                NumApprovalsThreshold: 1,
                NextTxnID: 0,
                InitialBalance: '1000000000000000000',
                StartEpoch: 239252,
                UnlockDuration: 100,
                PendingTxns: {
                  '/': 'bafy2bzaceamp42wmmgr2g2ymg46euououzfyck7szknvfacqscohrvaikwfay'
                }
              }
            }
          case 'MsigGetAvailableBalance':
            return '1000000000000000000'
          default:
            throw new Error('unknown method')
        }
      })
    }
  })

jest
  .spyOn(require('../../../generated/graphql'), 'useAddressQuery')
  .mockImplementation(() => ({
    data: {
      address: {
        id: MULTISIG_ACTOR_ID,
        robust: MULTISIG_ACTOR_ADDRESS
      }
    },
    loading: false,
    error: null
  }))

describe('ActorState', () => {
  test('it renders the loading view correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <TestEnvironment withApollo>
          <ThemeProvider theme={theme}>
            <ActorState address={MULTISIG_ACTOR_ADDRESS} />
          </ThemeProvider>
        </TestEnvironment>
      )

      expect(
        getByText(result.container, 'Locating this actor on the blockchain...')
      ).toBeInTheDocument()
    })
  })

  test('it renders the not found state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <TestEnvironment withApollo>
          <ThemeProvider theme={theme}>
            <ActorState address='t011' />
          </ThemeProvider>
        </TestEnvironment>
      )
    })

    expect(
      getByText(result!.container, 'Actor not found: t011')
    ).toBeInTheDocument()
  })

  test('it renders the actor state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <TestEnvironment withApollo>
          <ThemeProvider theme={theme}>
            <ActorState address={MULTISIG_ACTOR_ADDRESS} />
          </ThemeProvider>
        </TestEnvironment>
      )

      await waitFor(() => {
        expect(
          getByText(result!.container, 'Click to show actor state ↓')
        ).toBeInTheDocument()
      })

      fireEvent.click(
        getByText(result!.container, 'Click to show actor state ↓')
      )
    })

    expect(getByText(result!.container, 'InitialBalance')).toBeInTheDocument()
    expect(getByText(result!.container, 'NextTxnID')).toBeInTheDocument()
    expect(
      getByText(result!.container, 'NumApprovalsThreshold')
    ).toBeInTheDocument()
    expect(
      getByText(result!.container, 'PendingTxns (CID)')
    ).toBeInTheDocument()
    expect(getByText(result!.container, 'Signers')).toBeInTheDocument()
    expect(getByText(result!.container, 'StartEpoch')).toBeInTheDocument()
    expect(getByText(result!.container, 'UnlockDuration')).toBeInTheDocument()

    expect(result!.container.firstChild).toMatchSnapshot()
  })
})
