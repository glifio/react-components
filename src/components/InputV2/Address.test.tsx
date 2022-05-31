import {
  cleanup,
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { useState } from 'react'
import { AddressInput, AddressInputProps } from './Address'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = "Enter the recipient's address"
const infoText = 'This will receive your funds'
const validAddress = 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
const invalidAddress = 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucz'

function ControlledInput({ value, ...props }: AddressInputProps) {
  const [controlled, setControlled] = useState<string>(value)
  return <AddressInput value={controlled} onChange={setControlled} {...props} />
}

describe('Address input', () => {
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
          <AddressInput
            label={labelText}
            info={infoText}
            value={validAddress}
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
      fireEvent.change(input, { target: { value: invalidAddress } })
      input.blur()
    })
    expect(input).toHaveValue(invalidAddress)
    expect(input).toHaveClass('error')
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenLastCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the disabled state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <AddressInput label={labelText} info={infoText} disabled={true} />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })

  test('it renders the not-truncated state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <AddressInput
            label={labelText}
            info={infoText}
            value={validAddress}
            truncate={false}
          />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })
})
