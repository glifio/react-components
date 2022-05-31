import {
  cleanup,
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { ButtonInput } from './Button'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Do something'
const infoText = 'Now is your chance'
const inputValue = 'Click here'

describe('Button input', () => {
  afterEach(cleanup)
  let onClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    onClick = jest.fn()
  })

  test('it renders correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ButtonInput label={labelText} info={infoText} value={inputValue} />
        </ThemeProvider>
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the submit button correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ButtonInput
            label={labelText}
            info={infoText}
            value={inputValue}
            submit
          />
        </ThemeProvider>
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the red state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ButtonInput
            red
            label={labelText}
            info={infoText}
            value={inputValue}
          />
        </ThemeProvider>
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the green state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ButtonInput
            green
            label={labelText}
            info={infoText}
            value={inputValue}
          />
        </ThemeProvider>
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the disabled state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ButtonInput
            disabled
            label={labelText}
            info={infoText}
            value={inputValue}
          />
        </ThemeProvider>
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it calls onClick when the button is clicked', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <ButtonInput
            label={labelText}
            info={infoText}
            value={inputValue}
            onClick={onClick}
          />
        </ThemeProvider>
      )
      // Click on the button
      fireEvent.click(getByRole(result.container, 'button'))
    })
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
