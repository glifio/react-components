import {
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { useState } from 'react'
import { BigIntInput, BigIntInputProps } from './BigInt'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Enter a really big value'
const infoText = 'This can exceed MAX_SAFE_INTEGER'
const setIsValid = jest.fn()

function ControlledInput({ value, ...props }: BigIntInputProps) {
  const [controlled, setControlled] = useState<BigInt>(value)
  return <BigIntInput value={controlled} onChange={setControlled} {...props} />
}

describe('BigInt input', () => {
  test('it renders correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <BigIntInput
            label={labelText}
            info={infoText}
            value={500n}
            setIsValid={setIsValid}
          />
        </ThemeProvider>
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenLastCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the value too high state correctly', async () => {
    let result: RenderResult | null = null
    let input: HTMLElement | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ControlledInput
            label={labelText}
            info={infoText}
            max={100n}
            setIsValid={setIsValid}
            autoFocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'spinbutton')
      fireEvent.change(input, { target: { value: 500 } })
      input.blur()
    })
    expect(input).toHaveValue(500)
    expect(input).toHaveClass('error')
    expect(setIsValid).toHaveBeenCalledTimes(2)
    expect(setIsValid).toHaveBeenLastCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the value too low state correctly', async () => {
    let result: RenderResult | null = null
    let input: HTMLElement | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ControlledInput
            label={labelText}
            info={infoText}
            min={-100n}
            setIsValid={setIsValid}
            autoFocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'spinbutton')
      fireEvent.change(input, { target: { value: -500 } })
      input.blur()
    })
    expect(input).toHaveValue(-500)
    expect(input).toHaveClass('error')
    expect(setIsValid).toHaveBeenCalledTimes(2)
    expect(setIsValid).toHaveBeenLastCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the disabled state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <BigIntInput label={labelText} info={infoText} disabled={true} />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })
})
