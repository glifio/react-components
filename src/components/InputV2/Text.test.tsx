import {
  cleanup,
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { useState } from 'react'
import { TextInput, TextInputProps } from './Text'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Enter your name'
const infoText = 'Nice to meet you'
const inputValue = 'My name is Glif'

function ControlledInput({ value, ...props }: TextInputProps) {
  const [controlled, setControlled] = useState<string>(value)
  return <TextInput value={controlled} onChange={setControlled} {...props} />
}

describe('Text input', () => {
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
          <TextInput
            label={labelText}
            info={infoText}
            value={inputValue}
            setIsValid={setIsValid}
          />
        </ThemeProvider>
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenLastCalledWith(true)
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
            value={inputValue}
            setIsValid={setIsValid}
            required={true}
            autofocus={true}
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

  test('it renders the vertical required state correctly', async () => {
    let result: RenderResult | null = null
    let input: HTMLElement | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ControlledInput
            label={labelText}
            info={infoText}
            value={inputValue}
            setIsValid={setIsValid}
            vertical={true}
            required={true}
            autofocus={true}
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
          <TextInput label={labelText} info={infoText} disabled={true} />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })
})
