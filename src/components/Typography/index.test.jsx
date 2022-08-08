import { render } from '@testing-library/react'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { Title, Text } from './index.stories'

describe('Typography', () => {
  test('Title story renders', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Title {...Title.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  test('Text story renders', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Text {...Text.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
