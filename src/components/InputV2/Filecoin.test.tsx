import {
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FilecoinInput, FilecoinInputProps } from './Filecoin'

const labelText = 'Enter an amount in Filecoin'
const infoText = 'This is how much will be transferred'
const setIsValid = jest.fn()

function ControlledInput({ value, ...props }: FilecoinInputProps) {
  const [controlled, setControlled] = useState<FilecoinNumber>(value)
  return (
    <FilecoinInput value={controlled} onChange={setControlled} {...props} />
  )
}

describe('Filecoin input', () => {
  test('it renders fil correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <FilecoinInput
          label={labelText}
          info={infoText}
          denom='fil'
          value={new FilecoinNumber(100, 'fil')}
          setIsValid={setIsValid}
        />
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenLastCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders attofil correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <FilecoinInput
          label={labelText}
          info={infoText}
          denom='attofil'
          value={new FilecoinNumber(100, 'attofil')}
          setIsValid={setIsValid}
        />
      )
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenLastCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders picofil correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <FilecoinInput
          label={labelText}
          info={infoText}
          denom='picofil'
          value={new FilecoinNumber(100, 'picofil')}
          setIsValid={setIsValid}
        />
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
        <ControlledInput
          label={labelText}
          info={infoText}
          denom='fil'
          max={new FilecoinNumber(10, 'fil')}
          setIsValid={setIsValid}
          autoFocus={true}
        />
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'spinbutton')
      fireEvent.change(input, { target: { value: 100 } })
      input.blur()
    })
    expect(input).toHaveValue(100)
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
        <ControlledInput
          label={labelText}
          info={infoText}
          denom='fil'
          min={new FilecoinNumber(100, 'fil')}
          setIsValid={setIsValid}
          autoFocus={true}
        />
      )
      // Make sure the error is shown
      input = getByRole(result.container, 'spinbutton')
      fireEvent.change(input, { target: { value: 10 } })
      input.blur()
    })
    expect(input).toHaveValue(10)
    expect(input).toHaveClass('error')
    expect(setIsValid).toHaveBeenCalledTimes(2)
    expect(setIsValid).toHaveBeenLastCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the disabled state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <FilecoinInput label={labelText} info={infoText} disabled={true} />
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })

  test('the user can input fractional values', async () => {
    let result: RenderResult | null = null
    let input: HTMLElement | null = null
    await act(async () => {
      result = render(
        <ControlledInput label={labelText} info={infoText} autoFocus={true} />
      )
      input = getByRole(result.container, 'spinbutton')

      // It treats a "." as an invalid number
      fireEvent.change(input, { target: { value: '.' } })
      jest.runAllTimers()
      expect(input).toHaveValue(null)

      // It treats ".0" as "0"
      fireEvent.change(input, { target: { value: '.0' } })
      jest.runAllTimers()
      expect(input).toHaveValue(0)

      // It treats ".01" as "0.01"
      fireEvent.change(input, { target: { value: '.01' } })
      jest.runAllTimers()
      expect(input).toHaveValue(0.01)
    })
  })
})
