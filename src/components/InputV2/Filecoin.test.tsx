import {
  cleanup,
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FilecoinInput, FilecoinInputProps } from './Filecoin'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Enter an amount in Filecoin'
const infoText = 'This is how much will be transferred'

function ControlledInput({ value, ...props }: FilecoinInputProps) {
  const [controlled, setControlled] = useState<FilecoinNumber>(value)
  return <FilecoinInput value={controlled} onChange={setControlled} {...props} />
}

describe('Filecoin input', () => {
  afterEach(cleanup)
  let setIsValid = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    setIsValid = jest.fn()
  })

  test('it renders fil correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <FilecoinInput
            label={labelText}
            info={infoText}
            denom='fil'
            value={new FilecoinNumber(100, 'fil')}
            setIsValid={setIsValid}
          />
        </ThemeProvider>
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders attofil correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <FilecoinInput
            label={labelText}
            info={infoText}
            denom='attofil'
            value={new FilecoinNumber(100, 'attofil')}
            setIsValid={setIsValid}
          />
        </ThemeProvider>
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders picofil correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <FilecoinInput
            label={labelText}
            info={infoText}
            denom='picofil'
            value={new FilecoinNumber(100, 'picofil')}
            setIsValid={setIsValid}
          />
        </ThemeProvider>
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenCalledWith(true)
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
            denom='fil'
            max={new FilecoinNumber(10, 'fil')}
            value={null}
            setIsValid={setIsValid}
            autofocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'spinbutton')
      fireEvent.change(input, { target: { value: 100 } })
      input.blur()
    })
    expect(input).toHaveValue(100)
    expect(input).toHaveClass('error')
    expect(setIsValid).toHaveBeenCalledTimes(2)
    expect(setIsValid).toHaveBeenCalledWith(false)
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
            denom='fil'
            min={new FilecoinNumber(100, 'fil')}
            value={null}
            setIsValid={setIsValid}
            autofocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'spinbutton')
      fireEvent.change(input, { target: { value: 10 } })
      input.blur()
    })
    expect(input).toHaveValue(10)
    expect(input).toHaveClass('error')
    expect(setIsValid).toHaveBeenCalledTimes(2)
    expect(setIsValid).toHaveBeenCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the disabled state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <FilecoinInput label={labelText} info={infoText} disabled={true} />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })
})
