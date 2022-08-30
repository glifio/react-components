import { act, fireEvent, render, waitFor } from '@testing-library/react'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { NetworkSelector } from '.'
import {
  EnvironmentProvider,
  Network,
  networks
} from '../../services/EnvironmentProvider'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: { network: Network.CALIBRATION },
  asPath: 'https://wallet.glif.io/'
}))

const windowReassignMock = jest.fn()

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
      global.window = Object.create(window)
      Object.defineProperty(window, 'location', {
        value: {
          assign: windowReassignMock
        }
      })

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
      const { getByText } = render(
        <EnvironmentProvider>
          <ThemeProvider theme={theme}>
            <NetworkSelector />
          </ThemeProvider>
        </EnvironmentProvider>
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

      expect(windowReassignMock).toHaveBeenCalledWith('https://wallet.glif.io/')
    })
  })
})
