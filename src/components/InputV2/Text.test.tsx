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
  let setIsValid = jest.fn()
  let onDelete = jest.fn()
  let onTimeout = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
    setIsValid = jest.fn()
    onDelete = jest.fn()
    onTimeout = jest.fn()
  })

  afterEach(() => {
    jest.clearAllTimers()
    cleanup()
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

  test('it calls onDelete when the delete button is clicked', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <TextInput
            deletable={true}
            label={labelText}
            info={infoText}
            value={inputValue}
            onDelete={onDelete}
          />
        </ThemeProvider>
      )
      // Click on the delete button
      fireEvent.click(result.container.querySelector('svg'))
    })
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it calls onTimeout after the user enters text', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <TextInput
            label={labelText}
            info={infoText}
            onTimeout={onTimeout}
          />
        </ThemeProvider>
      )
      // Enter something in the input field
      const input = getByRole(result.container, 'textbox')
      fireEvent.change(input, { target: { value: inputValue } })
      jest.runAllTimers()
    })
    expect(onTimeout).toHaveBeenCalledTimes(1)
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
