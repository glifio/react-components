import {
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { useState } from 'react'
import { ParamsInput, ParamsInputProps } from './Params'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Enter some Base64 parameters'
const infoText = 'Only valid Base64 is allowed'
const validBase64 = 'dGVzdDEyMw=='
const invalidBase64 = 'test123'
const setIsValid = jest.fn()

function ControlledInput({ value, ...props }: ParamsInputProps) {
  const [controlled, setControlled] = useState<string>(value)
  return <ParamsInput value={controlled} onChange={setControlled} {...props} />
}

describe('Params input', () => {
  test('it renders correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ParamsInput
            label={labelText}
            info={infoText}
            value={validBase64}
            setIsValid={setIsValid}
          />
        </ThemeProvider>
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenLastCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the invalid state correctly', async () => {
    let result: RenderResult | null = null
    let input: HTMLElement | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ControlledInput
            label={labelText}
            info={infoText}
            setIsValid={setIsValid}
            autoFocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'textbox')
      fireEvent.change(input, { target: { value: invalidBase64 } })
      input.blur()
    })
    expect(input).toHaveValue(invalidBase64)
    expect(input).toHaveClass('error')
    expect(setIsValid).toHaveBeenCalledTimes(2)
    expect(setIsValid).toHaveBeenLastCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the required state correctly', async () => {
    let result: RenderResult | null = null
    let input: HTMLElement | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ControlledInput
            label={labelText}
            info={infoText}
            value={validBase64}
            setIsValid={setIsValid}
            required={true}
            autoFocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'textbox')
      fireEvent.change(input, { target: { value: '' } })
      input.blur()
    })
    expect(input).toHaveValue('')
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
          <ParamsInput label={labelText} info={infoText} disabled={true} />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })
})
