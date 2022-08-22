import { render } from '@testing-library/react'
import { CidLink } from './CidLink'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

describe('Receive', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CidLink
          label='Message'
          cid='bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
        />
      </ThemeProvider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
