import {
  render,
  act,
  getByRole,
  fireEvent,
  RenderResult
} from '@testing-library/react'
import { ButtonInput } from './Button'

const labelText = 'Do something'
const infoText = 'Now is your chance'
const inputValue = 'Click here'
const onClick = jest.fn()

describe('Button input', () => {
  test('it renders correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ButtonInput label={labelText} info={infoText} value={inputValue} />
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the submit button correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ButtonInput
          label={labelText}
          info={infoText}
          value={inputValue}
          submit
        />
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the red state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ButtonInput red label={labelText} info={infoText} value={inputValue} />
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the green state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ButtonInput
          green
          label={labelText}
          info={infoText}
          value={inputValue}
        />
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the disabled state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ButtonInput
          disabled
          label={labelText}
          info={infoText}
          value={inputValue}
        />
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it calls onClick when the button is clicked', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ButtonInput
          label={labelText}
          info={infoText}
          value={inputValue}
          onClick={onClick}
        />
      )
      // Click on the button
      fireEvent.click(getByRole(result.container, 'button'))
    })
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
