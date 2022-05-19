import {
  cleanup,
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { useState } from 'react'
import { flushPromises } from '../../test-utils'
import { NumberInput, NumberInputProps } from './Number'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'What is your favourite number?'
const infoText = 'Or your second favourite'

function ControlledInput({ value, ...props }: NumberInputProps) {
  const [controlled, setControlled] = useState<number>(value)
  return <NumberInput value={controlled} onChange={setControlled} {...props} />
}

describe('Number input', () => {
  afterEach(cleanup)
  let setIsValid = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    setIsValid = jest.fn()
  })

  test('it renders correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <NumberInput
            label={labelText}
            info={infoText}
            value={500}
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
            max={100}
            setIsValid={setIsValid}
            autofocus={true}
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
            min={-100}
            setIsValid={setIsValid}
            autofocus={true}
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
          <NumberInput label={labelText} info={infoText} disabled={true} />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })

  test('the user can input fractional values', async () => {
    let result: RenderResult | null = null
    let input: HTMLElement | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ControlledInput label={labelText} info={infoText} autofocus={true} />
        </ThemeProvider>
      )
      input = getByRole(result.container, 'spinbutton')

      // It treats a "." as an invalid number
      fireEvent.change(input, { target: { value: '.' } })
      input.blur()
      await flushPromises()
      expect(input).toHaveValue(null)

      // It treats ".0" as "0"
      fireEvent.change(input, { target: { value: '.0' } })
      input.blur()
      await flushPromises()
      expect(input).toHaveValue(0)

      // It treats ".01" as "0.01"
      fireEvent.change(input, { target: { value: '.01' } })
      input.blur()
      await flushPromises()
      expect(input).toHaveValue(0.01)
    })
  })
})
