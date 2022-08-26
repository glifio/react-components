import { act, fireEvent, render, waitFor } from '@testing-library/react'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { NetworkSelector } from '.'
import { Network, networks } from '../../services/EnvironmentProvider'

const mockRouterPush = jest.fn()
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: { network: 'calibration' },
  push: mockRouterPush,
  asPath: 'https://wallet.glif.io/'
}))

describe('NetworkSelector', () => {
  test('it renders the loading state first', () => {
    const { container, getByText } = render(
      <ThemeProvider theme={theme}>
        <NetworkSelector />
      </ThemeProvider>
    )
    expect(getByText(/Loading network/)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  describe('interactions', () => {
    beforeEach(() => {
      jest
        .spyOn(require('./useNetworkName'), 'useNetworkName')
        .mockImplementation(lotusApiAddr => {
          if (lotusApiAddr === networks.mainnet.lotusApiUrl)
            return { networkName: Network.MAINNET, error: '', loading: false }

          return { networkName: Network.CALIBRATION, error: '', loading: false }
        })

      jest
        .spyOn(require('./useNetworkStatus'), 'useNetworkStatus')
        .mockImplementation(() => {
          return { networkConnected: true, error: '' }
        })
    })

    test('it renders the network after load', async () => {
      const { container, getByText } = render(
        <TestEnvironment>
          <ThemeProvider theme={theme}>
            <NetworkSelector />
          </ThemeProvider>
        </TestEnvironment>
      )

      await waitFor(() => {
        expect(getByText(Network.CALIBRATION)).toBeInTheDocument()
        expect(container.firstChild).toMatchSnapshot()
      })
    })

    test('it renders the network options', async () => {
      const { container, getByText, getAllByText } = render(
        <TestEnvironment>
          <ThemeProvider theme={theme}>
            <NetworkSelector />
          </ThemeProvider>
        </TestEnvironment>
      )

      await waitFor(() => {
        expect(getByText(Network.CALIBRATION)).toBeInTheDocument()
      })

      act(() => {
        fireEvent.click(getByText(Network.CALIBRATION))
      })

      expect(getAllByText(Network.CALIBRATION).length).toBe(2)
      expect(getByText(Network.MAINNET)).toBeInTheDocument()
      expect(getByText(Network.WALLABY)).toBeInTheDocument()
      expect(container.firstChild).toMatchSnapshot()
    })

    test('it changes the network', async () => {
      const { getByText, queryByText } = render(
        <TestEnvironment>
          <ThemeProvider theme={theme}>
            <NetworkSelector />
          </ThemeProvider>
        </TestEnvironment>
      )

      await waitFor(() => {
        expect(getByText(Network.CALIBRATION)).toBeInTheDocument()
      })

      act(() => {
        fireEvent.click(getByText(Network.CALIBRATION))
      })

      act(() => {
        fireEvent.click(getByText(Network.MAINNET))
      })

      await waitFor(() => {
        expect(getByText(Network.MAINNET)).toBeInTheDocument()

        expect(queryByText(Network.CALIBRATION)).toBe(null)
        expect(queryByText(Network.WALLABY)).toBe(null)

        expect(mockRouterPush).toHaveBeenCalledWith('https://wallet.glif.io/')
      })

      // switch back and test URL params
      act(() => {
        fireEvent.click(getByText(Network.MAINNET))
      })

      act(() => {
        fireEvent.click(getByText(Network.CALIBRATION))
      })

      await waitFor(() => {
        expect(getByText(Network.CALIBRATION)).toBeInTheDocument()

        expect(queryByText(Network.MAINNET)).toBe(null)
        expect(queryByText(Network.WALLABY)).toBe(null)

        expect(mockRouterPush).toHaveBeenCalledWith(
          'https://wallet.glif.io/?network=calibration'
        )
      })
    })
  })
})