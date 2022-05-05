import { cleanup, render, act, getByRole, RenderResult } from '@testing-library/react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FilecoinInput } from './Filecoin'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Enter an amount in Filecoin'
const infoText = 'This is how much will be transferred'

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
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <FilecoinInput
            label={labelText}
            info={infoText}
            denom='fil'
            max={new FilecoinNumber(10, 'fil')}
            value={new FilecoinNumber(100, 'fil')}
            setIsValid={setIsValid}
            autofocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      getByRole(result.container, 'spinbutton').blur()
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the value too low state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <FilecoinInput
            label={labelText}
            info={infoText}
            denom='fil'
            min={new FilecoinNumber(100, 'fil')}
            value={new FilecoinNumber(10, 'fil')}
            setIsValid={setIsValid}
            autofocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      getByRole(result.container, 'spinbutton').blur()
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the disabled state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <FilecoinInput
            label={labelText}
            info={infoText}
            disabled={true}
          />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })
})
