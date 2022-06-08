import { render, cleanup } from '@testing-library/react'

import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { Base } from './index.stories'

describe('FloatingContainer', () => {
  afterEach(cleanup)
  test('renders the floating container', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Base {...Base.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
