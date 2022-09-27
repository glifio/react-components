import { render } from '@testing-library/react'
import { AddressLink } from './AddressLink'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { ApolloWrapper } from '../../utils/apollo'

describe('AddressLink', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <TestEnvironment>
        <ApolloWrapper>
          <AddressLink
            label='Safe Address'
            address='t137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy'
          />
        </ApolloWrapper>
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
