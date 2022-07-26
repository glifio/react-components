import React from 'react'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CoinType } from '@glif/filecoin-address'

import { CreateAccount } from './Create'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'
import { createPath } from '../../utils'
import { coinTypeCode } from '../../utils/createPath'

const spy = jest.fn().mockImplementation(() => Promise.resolve())

describe('Create new account', () => {
  test('it creates a new account at the wallet index by default', async () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CreateAccount accountIdx={0} fetchNextAccount={spy} />
      </ThemeProvider>
    )
    expect(screen.getByText('Next account')).toBeInTheDocument()
    expect(screen.getByText('Expert Mode')).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByText('Next account'))
    })

    waitFor(() => {
      expect(spy).toHaveBeenCalledWith(0, CoinType.TEST)
    })

    expect(container.firstChild).toMatchSnapshot()
  })

  test('it creates a new account at the specified index in expert mode', async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <CreateAccount accountIdx={0} fetchNextAccount={spy} />
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
      expect(spy).toHaveBeenCalledWith(10, CoinType.TEST)
    })
  })
})
