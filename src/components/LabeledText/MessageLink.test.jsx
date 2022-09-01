import { render } from '@testing-library/react'
import { MessageLink } from './MessageLink'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { TestEnvironment } from '../../test-utils/TestEnvironment'

describe('MessageLink', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <MessageLink
            label='Message'
            cid='bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
          />
        </ThemeProvider>
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
