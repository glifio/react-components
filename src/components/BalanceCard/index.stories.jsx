import { FilecoinNumber } from '@glif/filecoin-number'
import { BalanceCard } from '.'

export default {
  title: 'BalanceCard/BalanceCard',
  component: BalanceCard,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <BalanceCard {...args} />

export const Base = Template.bind({})
Base.args = {
  balance: new FilecoinNumber('100', 'fil')
}
