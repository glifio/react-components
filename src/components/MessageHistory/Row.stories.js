import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import Row from './Row'

export default {
  title: 'MessageHistory/Row',
  component: Row,
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
  <Row
    {...args}
    addressHref={address => `/#/history/${address}`}
    cidHref={cid => `/#/detail/${cid}`}
  />
)

export const GenericRow = Template.bind({})
GenericRow.args = {
  cid: 'bafy2bzaceaspwtvvz3hf23gw5eu2547cl2kwdruqt3omnow5ukazi3aopmmjm',
  method: 'transfer',
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
  totalCost: '21375685904209'
}

export const SearchedRow = Template.bind({})
SearchedRow.args = {
  cid: 'bafy2bzaceaspwtvvz3hf23gw5eu2547cl2kwdruqt3omnow5ukazi3aopmmjm',
  method: 'transfer',
  height: '234125',
  age: '23516427',
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
  inspectingAddress: 'f1b64l7up4oov74ignqfadshkge7h7aifwsaapjzd'
}

export const PendingRow = Template.bind({})
PendingRow.args = {
  cid: 'bafy2bzaceaspwtvvz3hf23gw5eu2547cl2kwdruqt3omnow5ukazi3aopmmjm',
  method: 'transfer',
  height: '234125',
  age: '23516427',
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
  inspectingAddress: 'f1b64l7up4oov74ignqfadshkge7h7aifwsaapjzd',
  pending: true
}
