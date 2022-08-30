import { render } from '@testing-library/react'
import { LabeledLink } from './LabeledLink'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

describe('LabeledLink', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <LabeledLink
          label='Glif Safe'
          href='https://safe.glif.link/'
          linkText='safe.glif.link'
          copyText='https://safe.glif.link/'
        />
      </ThemeProvider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
