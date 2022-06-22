import { render } from '@testing-library/react'

import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { Base } from './index.stories'

describe('NetworkSwitcherGlyph', () => {
  test('renders NetworkSwitcherGlyph', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Base {...Base.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
