import { render } from '@testing-library/react'
import { MessageLink } from './MessageLink'
import { TestEnvironment } from '../../test-utils/TestEnvironment'

describe('MessageLink', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <TestEnvironment>
        <MessageLink
          label='Message'
          cid='bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
        />
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
