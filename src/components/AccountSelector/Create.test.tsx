import React from 'react'
import { render, act, screen, fireEvent } from '@testing-library/react'
import { CoinType } from '@glif/filecoin-address'

import ThemeProvider from '../ThemeProvider'
import theme from '../theme'
import Create from './Create'

describe('Create Account', () => {
  test('it calls the callback with the right network and index', () => {
    const mock = jest.fn()
    const nextAccountIdx = 1
    act(() => {
      render(
        <ThemeProvider theme={theme}>
          <Create
            onClick={mock}
            loading={false}
            nextAccountIndex={nextAccountIdx}
            defaultCoinType={CoinType.TEST}
            errorMsg=''
          />
        </ThemeProvider>
      )
      fireEvent.click(screen.getByText('Create'))
    })

    expect(mock).toHaveBeenCalledWith(nextAccountIdx, 't')
  })

  test('it calls the callback with the right network and index 2', async () => {
    const mock = jest.fn()
    const nextAccountIdx = 5

    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <Create
            onClick={mock}
            loading={false}
            nextAccountIndex={nextAccountIdx}
            defaultCoinType={CoinType.TEST}
            errorMsg=''
          />
        </ThemeProvider>
      )
      fireEvent.click(screen.getByText('Normal address'))
      jest.runAllTimers()
      fireEvent.click(screen.getByText('Create'))
    })

    expect(mock).toHaveBeenCalledWith(nextAccountIdx, 'f')
  })
})
