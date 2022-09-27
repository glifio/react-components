import { FilecoinNumber } from '@glif/filecoin-number'
import { fireEvent, render, act } from '@testing-library/react'
import { BalanceCard } from '.'
import noop from '../../utils/noop'
import { Base } from './index.stories'

describe('BalanceCard', () => {
  test('renders the story', () => {
    const mockOnSend = jest.fn()
    const { container } = render(<Base {...Base.args} onSend={mockOnSend} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders correctly', () => {
    const { container } = render(
      <BalanceCard balance={new FilecoinNumber('100', 'fil')} onSend={noop} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders pretty billion dollar balances', () => {
    const { container } = render(
      <BalanceCard
        balance={new FilecoinNumber('10023324902.1241', 'fil')}
        onSend={noop}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders pretty million dollar balances', () => {
    const { container } = render(
      <BalanceCard
        balance={new FilecoinNumber('10022324.1241', 'fil')}
        onSend={noop}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders pretty thousand dollar balances', () => {
    const { container } = render(
      <BalanceCard
        balance={new FilecoinNumber('10021.1241', 'fil')}
        onSend={noop}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders pretty under thousand dollar balances', () => {
    const { container } = render(
      <BalanceCard
        balance={new FilecoinNumber('999.1241', 'fil')}
        onSend={noop}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders pretty under 1 dollar balances', () => {
    const { container } = render(
      <BalanceCard
        balance={new FilecoinNumber('.00001', 'fil')}
        onSend={noop}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('it renders precise when the user clicks "precise"', () => {
    const { container, getByText } = render(
      <BalanceCard
        balance={new FilecoinNumber('23488219.00001', 'fil')}
        onSend={noop}
      />
    )

    act(() => {
      fireEvent.click(getByText('Exact'))
    })

    expect(container.firstChild).toMatchSnapshot()
  })
})
