import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import MessageDetail from './Detail'

export default {
  title: 'MessageHistory/MessageDetail',
  component: MessageDetail,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <MessageDetail {...args} />

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzaceaspwtvvz3hf23gw5eu2547cl2kwdruqt3omnow5ukazi3aopmmjm',
  method: 'Transfer',
  height: '234125',
  timestamp: '23516427',
  from: {
    address: 'f1b64l7up4oov74ignqfadshkge7h7aifwsaapjzd',
    id: 'f0467876'
  },
  to: {
    address: 'f1b64l7up4oov74ignqfadshkge7h7aivdsjiownio',
    id: 'f078987'
  },
  value: '13547168198490157',
  totalCost: '21375685904209',
  gasLimit: '100',
  gasFeeCap: '10000000000000',
  gasPremium: '1',
  status: 'CONFIRMED',
  messageExit: 'SUCCESS',
  confidence: 'HIGH',
  exit: 'SUCCESS',
  gas_burned: '100',
  gas_refund: '100',
  base_fee_burn: '100',
  gas_used: '100',
  over_estimation_burn: '100'
}
