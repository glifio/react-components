import { cleanup, render, act, RenderResult } from '@testing-library/react'
import { Toggle } from './Toggle'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

const labelText = 'Turn me on or off'
const infoText = 'And see what it does'

describe('Toggle input', () => {
  afterEach(cleanup)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('it renders the on state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <Toggle
            label={labelText}
            info={infoText}
            checked={true}
          />
        </ThemeProvider>
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })

  test('it renders the off state correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <Toggle
            label={labelText}
            info={infoText}
            checked={false}
          />
        </ThemeProvider>
      )
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })
})
