/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ApolloProvider } from '@apollo/client'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { AccountCard } from '.'
jest.mock('../../utils/copyToClipboard')
import copyToClipboard from '../../utils/copyToClipboard'
import { Base } from './index.stories'
import { client } from '../HistoryTables/apolloClient'
import { TestEnvironment } from '../../test-utils/TestEnvironment'

describe('AccountCard', () => {
  test('renders the story', () => {
    const { container } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Base {...Base.args} />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the card', () => {
    const { container } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AccountCard
              onAccountSwitch={() => {}}
              color='purple'
              address='t0123456789'
              walletType='LEDGER'
              onShowOnLedger={() => {}}
              ledgerBusy={false}
              mb={2}
            />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the card CREATE_MNEMONIC', () => {
    const { container } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AccountCard
              onAccountSwitch={() => {}}
              color='purple'
              address='t0123456789'
              walletType='CREATE_MNEMONIC'
              onShowOnLedger={() => {}}
              ledgerBusy={false}
              mb={2}
            />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the address', () => {
    render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AccountCard
              onAccountSwitch={() => {}}
              color='purple'
              address='t0123'
              walletType='LEDGER'
              onShowOnLedger={() => {}}
              ledgerBusy={false}
              mb={2}
            />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )

    expect(screen.getByText('t0123', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Your Address')).toBeInTheDocument()
  })

  test('clicking "Switch" calls onAccountSwitch', () => {
    const mockOnAccountSwitch = jest.fn()
    const { getByText } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AccountCard
              onAccountSwitch={mockOnAccountSwitch}
              color='purple'
              address='t0123'
              walletType='LEDGER'
              onShowOnLedger={() => {}}
              ledgerBusy={false}
              mb={2}
            />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )

    act(() => {
      fireEvent.click(getByText('Switch'))
    })

    expect(mockOnAccountSwitch).toHaveBeenCalled()
  })

  test('clicking "Show on Device" calls onShowOnLedger', () => {
    const mockOnShowOnLedger = jest.fn()
    const { getByText } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AccountCard
              onAccountSwitch={() => {}}
              color='purple'
              address='t0123'
              walletType='LEDGER'
              onShowOnLedger={mockOnShowOnLedger}
              ledgerBusy={false}
              mb={2}
            />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )

    act(() => {
      fireEvent.click(getByText('Show on Device'))
    })

    expect(mockOnShowOnLedger).toHaveBeenCalled()
  })

  test('clicking "Copy" calls copy', async () => {
    const mockCopyToClipboard = jest.fn(() => Promise.resolve('yo'))
    copyToClipboard.mockImplementationOnce(mockCopyToClipboard)

    const { getByText } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AccountCard
              onAccountSwitch={() => {}}
              color='purple'
              address='t0123'
              walletType='LEDGER'
              onShowOnLedger={() => {}}
              ledgerBusy={false}
              mb={2}
            />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )

    act(() => {
      fireEvent.click(getByText('Copy'))
    })

    expect(mockCopyToClipboard).toHaveBeenCalled()
    expect(screen.getByText('Copied')).toBeInTheDocument()
  })
})
