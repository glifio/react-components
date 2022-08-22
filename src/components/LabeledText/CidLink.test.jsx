import { render } from '@testing-library/react'
import { CidLink } from './CidLink'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { Environment } from '../../services/EnvironmentProvider'

describe('Receive', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <Environment>
        <ThemeProvider theme={theme}>
          <CidLink
            label='Message'
            cid='bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
          />
        </ThemeProvider>
      </Environment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
