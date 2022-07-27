import React from 'react'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CoinType } from '@glif/filecoin-address'

import { CreateAccount } from './Create'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'
import { createPath } from '../../utils'
import { coinTypeCode } from '../../utils/createPath'
import { LoginOption } from '../../customPropTypes'

const fetchNextAccountSpy = jest
  .fn()
  .mockImplementation(() => Promise.resolve())

const keyDeriveSpy = jest.fn().mockImplementation(() => Promise.resolve())

const createObjectURLSpy = jest
  .fn()
  .mockImplementation(() => Promise.resolve('data-url-string'))

describe('Create new account', () => {
  beforeAll(() => {
    global.URL.createObjectURL = createObjectURLSpy
  })
  test('it creates a new account at the wallet index by default', async () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CreateAccount
          keyDerive={keyDeriveSpy}
          loginOption={LoginOption.IMPORT_SINGLE_KEY}
          setError={() => {}}
          accountIdx={0}
          fetchNextAccount={fetchNextAccountSpy}
        />
      </ThemeProvider>
    )
    expect(screen.getByText('Next account')).toBeInTheDocument()
    expect(screen.getByText('Expert Mode')).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByText('Next account'))
    })

    waitFor(() => {
      expect(fetchNextAccountSpy).toHaveBeenCalledWith(0, CoinType.TEST)
    })

    expect(container.firstChild).toMatchSnapshot()
  })

  test('it creates a new account at the specified index in expert mode', async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <CreateAccount
            keyDerive={keyDeriveSpy}
            loginOption={LoginOption.IMPORT_SINGLE_KEY}
            setError={() => {}}
            accountIdx={0}
            fetchNextAccount={fetchNextAccountSpy}
          />
        </ThemeProvider>
      )
      expect(screen.getByText('Next account')).toBeInTheDocument()
      expect(screen.getByText('Expert Mode')).toBeInTheDocument()

      const toggle = screen.getByRole('checkbox')
      toggle.focus()
      fireEvent.click(toggle)
      toggle.blur()

      await waitFor(() => {
        expect(screen.getByText('Create account')).toBeInTheDocument()
      })

      const accountIdx = screen.getByRole('spinbutton')
      accountIdx.focus()
      fireEvent.change(accountIdx, { target: { value: 10 } })
      accountIdx.blur()

      await waitFor(() => {
        expect(
          screen.getByText(createPath(coinTypeCode(CoinType.TEST), 10))
        ).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Add account'))
      expect(fetchNextAccountSpy).toHaveBeenCalledWith(10, CoinType.TEST)
    })
  })

  test('it exports a private key', async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <CreateAccount
            keyDerive={keyDeriveSpy}
            loginOption={LoginOption.IMPORT_SINGLE_KEY}
            setError={err => {
              console.log(err)
            }}
            accountIdx={0}
            fetchNextAccount={fetchNextAccountSpy}
          />
        </ThemeProvider>
      )
      expect(screen.getByText('Next account')).toBeInTheDocument()
      expect(screen.getByText('Expert Mode')).toBeInTheDocument()

      const toggle = screen.getByRole('checkbox')
      toggle.focus()
      fireEvent.click(toggle)
      toggle.blur()

      await waitFor(() => {
        expect(screen.getByText('Create account')).toBeInTheDocument()
      })

      const privateKeyExport = screen.getByText('Export private key')
      fireEvent.click(privateKeyExport)

      await waitFor(() => {
        expect(createObjectURLSpy).toHaveBeenCalled()
        // TODO: find out why this test doesn't work
        // expect(screen.getByRole('download')).toHaveAttribute('href', 'data-url-string')
      })
    })
  })
})
