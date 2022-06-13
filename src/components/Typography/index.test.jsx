import { cleanup, render } from '@testing-library/react'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import {
  BigTitle,
  Title,
  Text,
  Label,
  Num
} from './index.stories'

describe('ButtonClose', () => {
  afterEach(cleanup)

  test('BigTitle story renders', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <BigTitle {...BigTitle.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
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
  test('Label story renders', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Label {...Label.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  test('Num story renders', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Num {...Num.args} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
