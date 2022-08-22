/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import { render, screen, act, fireEvent } from '@testing-library/react'
import { CoinType } from '@glif/filecoin-address'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { AccountCard } from '.'
jest.mock('../../utils/copyToClipboard')
import copyToClipboard from '../../utils/copyToClipboard'
import { Base } from './index.stories'
import { Environment, Network } from '../../services/EnvironmentProvider'

describe('AccountCard', () => {
  test('renders the story', () => {
    const { container } = render(
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <ThemeProvider theme={theme}>
          <Base {...Base.args} />
        </ThemeProvider>
      </Environment>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the card', () => {
    const { container } = render(
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <ThemeProvider theme={theme}>
          <AccountCard
            onAccountSwitch={() => {}}
            color='purple'
            address='t0123456789'
            walletType='LEDGER'
            onShowOnLedger={() => {}}
            ledgerBusy={false}
            mb={2}
          />
        </ThemeProvider>
      </Environment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the card CREATE_MNEMONIC', () => {
    const { container } = render(
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <ThemeProvider theme={theme}>
          <AccountCard
            onAccountSwitch={() => {}}
            color='purple'
            address='t0123456789'
            walletType='CREATE_MNEMONIC'
            onShowOnLedger={() => {}}
            ledgerBusy={false}
            mb={2}
          />
        </ThemeProvider>
      </Environment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the address', () => {
    render(
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <ThemeProvider theme={theme}>
          <AccountCard
            onAccountSwitch={() => {}}
            color='purple'
            address='t0123'
            walletType='LEDGER'
            onShowOnLedger={() => {}}
            ledgerBusy={false}
            mb={2}
          />
        </ThemeProvider>
      </Environment>
    )

    expect(screen.getByText('t0123', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Your Address')).toBeInTheDocument()
  })

  test('clicking "Switch" calls onAccountSwitch', () => {
    const mockOnAccountSwitch = jest.fn()
    const { getByText } = render(
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <ThemeProvider theme={theme}>
          <AccountCard
            onAccountSwitch={mockOnAccountSwitch}
            color='purple'
            address='t0123'
            walletType='LEDGER'
            onShowOnLedger={() => {}}
            ledgerBusy={false}
            mb={2}
          />
        </ThemeProvider>
      </Environment>
    )

    act(() => {
      fireEvent.click(getByText('Switch'))
    })

    expect(mockOnAccountSwitch).toHaveBeenCalled()
  })

  test('clicking "Show on Device" calls onShowOnLedger', () => {
    const mockOnShowOnLedger = jest.fn()
    const { getByText } = render(
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <ThemeProvider theme={theme}>
          <AccountCard
            onAccountSwitch={() => {}}
            color='purple'
            address='t0123'
            walletType='LEDGER'
            onShowOnLedger={mockOnShowOnLedger}
            ledgerBusy={false}
            mb={2}
          />
        </ThemeProvider>
      </Environment>
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
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <ThemeProvider theme={theme}>
          <AccountCard
            onAccountSwitch={() => {}}
            color='purple'
            address='t0123'
            walletType='LEDGER'
            onShowOnLedger={() => {}}
            ledgerBusy={false}
            mb={2}
          />
        </ThemeProvider>
      </Environment>
    )

    act(() => {
      fireEvent.click(getByText('Copy'))
    })

    expect(mockCopyToClipboard).toHaveBeenCalled()
    expect(screen.getByText('Copied')).toBeInTheDocument()
  })
})
