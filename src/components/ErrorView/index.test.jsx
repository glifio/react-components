import { render, act, fireEvent } from '@testing-library/react'
import { ErrorView } from '.'
import { Base } from './index.stories'

describe('Error', () => {
  test('renders the story', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the error', () => {
    const { container } = render(
      <ErrorView
        title='Ledger only supports Chrome'
        description='Please install Google Chrome to continue using your Ledger device, or choose an alternative setup option'
        linkDisplay='Install Google Chrome.'
        linkhref='https://www.google.com/chrome'
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the error with the correct text', () => {
    const { getByText } = render(
      <ErrorView
        title='Ledger only supports Chrome'
        description='Please install Google Chrome to continue using your Ledger device, or choose an alternative setup option'
        linkDisplay='Install Google Chrome.'
        linkhref='https://www.google.com/chrome'
      />
    )

    expect(getByText('Ledger only supports Chrome')).toBeTruthy()
    expect(
      getByText(
        'Please install Google Chrome to continue using your Ledger device, or choose an alternative setup option'
      )
    ).toBeTruthy()
    expect(getByText('Install Google Chrome.')).toBeTruthy()
  })

  test.skip('clicking "Back" takes you back to onboarding', () => {
    const useRouter = jest.spyOn(
      /* eslint-disable-next-line global-require */
      require('next/router'),
      'useRouter'
    )
    const mockRouterReplace = jest.fn(() => {})
    useRouter.mockImplementationOnce(() => ({
      replace: mockRouterReplace,
      query: 'network=t'
    }))

    const { getByText } = render(
      <ErrorView
        title='Ledger only supports Chrome'
        description='Please install Google Chrome to continue using your Ledger device, or choose an alternative setup option'
        linkDisplay='Install Google Chrome.'
        linkhref='https://www.google.com/chrome'
      />
    )

    act(() => {
      fireEvent.click(getByText('Back'))
    })

    expect(mockRouterReplace).toHaveBeenCalled()
    expect(mockRouterReplace).toHaveBeenCalledWith('/')
  })
})
