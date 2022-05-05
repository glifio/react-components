import {
  cleanup,
  render,
  act,
  getByRole,
  RenderResult
} from '@testing-library/react'
import { NumberInput } from './Number'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'What is your favourite number?'
const infoText = 'Or your second favourite'

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
    expect(setIsValid).toHaveBeenCalledWith(true)
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the value too high state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <NumberInput
            label={labelText}
            info={infoText}
            max={100}
            value={500}
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
          <NumberInput
            label={labelText}
            info={infoText}
            min={-100}
            value={-500}
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
          <NumberInput label={labelText} info={infoText} disabled={true} />
        </ThemeProvider>
      )
      expect(result.container.firstChild).toMatchSnapshot()
    })
  })
})
