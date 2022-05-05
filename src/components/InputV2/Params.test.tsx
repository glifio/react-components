import { cleanup, render, act, getByRole, RenderResult } from '@testing-library/react'
import { ParamsInput } from './Params'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Enter some Base64 parameters'
const infoText = 'Only valid Base64 is allowed'
const validBase64 = 'dGVzdDEyMw=='
const invalidBase64 = 'test123'

describe('Params input', () => {
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
    expect(setIsValid).toHaveBeenCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the invalid state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ParamsInput
            label={labelText}
            info={infoText}
            value={invalidBase64}
            setIsValid={setIsValid}
            autofocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      getByRole(result.container, 'textbox').blur()
    })
    expect(setIsValid).toHaveBeenCalledTimes(1)
    expect(setIsValid).toHaveBeenCalledWith(false)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the required state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ParamsInput
            label={labelText}
            info={infoText}
            setIsValid={setIsValid}
            required={true}
            autofocus={true}
          />
        </ThemeProvider>
      )
      // Make sure the error is shown
      getByRole(result.container, 'textbox').blur()
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
          <ParamsInput
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
