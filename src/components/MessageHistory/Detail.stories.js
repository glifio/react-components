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
  method: 'transfer',
  height: '234125',
  timestamp: '23516427',
  from: 'f1b64l7up4oov74ignqfadshkge7h7aifwsaapjzd',
  to: 'f1b64l7up4oov74ignqfadshkge7h7aivdsjiownio',
  value: '13547168198490157',
  feePaid: '21375685904209',
  gasLimit: '100',
  gasFeeCap: '10000000000000',
  gasPremium: '1'
}
