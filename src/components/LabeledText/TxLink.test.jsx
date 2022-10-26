import { render } from '@testing-library/react'
import { TxLink } from './TxLink'
import { TestEnvironment } from '../../test-utils/TestEnvironment'

describe('TxLink', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <TestEnvironment>
        <TxLink
          label='Message'
          txID='bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
        />
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
