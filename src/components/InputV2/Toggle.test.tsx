import { render, act, RenderResult } from '@testing-library/react'
import { Toggle } from './Toggle'

const labelText = 'Turn me on or off'
const infoText = 'And see what it does'

describe('Toggle input', () => {
  test('it renders the on state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(<Toggle label={labelText} info={infoText} checked />)
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the off state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <Toggle label={labelText} info={infoText} checked={false} />
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })
})
