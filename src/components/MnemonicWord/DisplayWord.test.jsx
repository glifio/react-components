import { render } from '@testing-library/react'

import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { Base } from './DisplayWord.stories'

describe('Box', () => {
  test('renders the story', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Base {...Base.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
