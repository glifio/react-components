import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import MessageConfirmedRow from './MessageConfirmedRow'

export default {
  title: 'MessageHistory/MessageConfirmedRow',
  component: MessageConfirmedRow,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => (
  <MessageConfirmedRow
    {...args}
    addressHref={address => `/#/history/${address}`}
    cidHref={cid => `/#/detail/${cid}`}
  />
)

export const GenericRow = Template.bind({})
GenericRow.args = {
  cid: 'bafy2bzaceaspwtvvz3hf23gw5eu2547cl2kwdruqt3omnow5ukazi3aopmmjm',
  methodStr: 'transfer',
  height: '234125',
  block: {
    Timestamp: '23516427'
  },
  from: {
    robust: 'f1b64l7up4oov74ignqfadshkge7h7aifwsaapjzd',
    id: 'f0467876'
  },
  to: {
    robust: 'f1b64l7up4oov74ignqfadshkge7h7aivdsjiownio',
    id: 'f078987'
  },
  value: '13547168198490157',
  minerTip: '2361798873630',
  overEstimationBurn: '1416781800',
  baseFeeBurn: '944521200',
  inspectingAddress: 'f1b64l7up4oov74ignqfadshkge7h7aifwsaapjzd'
}
