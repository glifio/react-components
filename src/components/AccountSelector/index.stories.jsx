import { ApolloProvider } from '@apollo/client'
import { CoinType } from '@glif/filecoin-address'
import Filecoin, { HDWalletProvider } from '@glif/filecoin-wallet-provider'
import WalletProviderWrapper, {
  initialLedgerState,
  initialMetaMaskState
} from '../../services/WalletProvider'
import { client } from '../HistoryTables/apolloClient'

import AccountSelector from './index'
import { LoginOption } from '../../customPropTypes'
import { createPath } from '../../utils'
import { FilecoinNumber } from '@glif/filecoin-number'

const LOTUS_API_ADDR = 'https://api.calibration.node.glif.io'

const SEED =
  'soda wage derive hard share hybrid drum company link size crush track inherit entire filter promote resource vocal cycle kind day intact palace mad'

const initialState = {
  loginOption: LoginOption.IMPORT_MNEMONIC,
  walletProvider: new Filecoin(new HDWalletProvider(SEED), {
    apiAddress: LOTUS_API_ADDR
  }),
  error: '',
  ledger: initialLedgerState,
  metamask: initialMetaMaskState,
  wallets: [
    {
      path: createPath(1, 0),
      balance: new FilecoinNumber('0', 'fil'),
      address: 't1mjvkd3nbiarnupgrw23anvft4zjwe4v54v3o44y',
      id: '',
      robust: 't1mjvkd3nbiarnupgrw23anvft4zjwe4v54v3o44y'
    }
  ],
  selectedWalletIdx: 0
}

export default {
  title: 'AccountSelector/AccountSelector',
  component: AccountSelector,
  decorators: [
    Story => (
      <ApolloProvider client={client}>
        <WalletProviderWrapper
          initialState={initialState}
          coinType={CoinType.TEST}
          lotusApiAddr='https://api.calibration.node.glif.io'
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {Story()}
          </div>
        </WalletProviderWrapper>
      </ApolloProvider>
    )
  ]
}

const Template = args => <AccountSelector {...args} />

export const Base = Template.bind({})
Base.args = {
  onSelectAccount: () => {},
  showSelectedAccount: true,
  helperText: 'Select an account',
  title: 'Account Selector',
  coinType: CoinType.TEST,
  nWalletsToLoad: 5
}
