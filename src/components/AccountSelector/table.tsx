import { CoinType } from '@glif/filecoin-address'
import PropTypes from 'prop-types'
import { AddressLink } from '../LabeledText/AddressLink'
import { Wallet } from '../../services/WalletProvider'
import { convertAddrToPrefix, makeFriendlyBalance } from '../../utils'
import { LoadingCaption, StatusIcon } from '../Layout'
import { COIN_TYPE_PROPTYPE, WALLET_PROPTYPE } from '../../customPropTypes'
import { useEnvironment } from '../../services/EnvironmentProvider'

export const idxFromPath = (path: string): string => {
  return path.split('/')[5]
}

const WalletRow = ({
  coinType,
  wallet,
  selectAccount,
  index,
  isSelected,
  showSelectedWallet
}: WalletRowProps) => {
  return (
    <tr className='selectable' onClick={() => selectAccount(index)}>
      {showSelectedWallet &&
        (isSelected ? (
          <td data-testid='selected-account'>
            <StatusIcon color='purple' margin='4px 0 0 1em' />
          </td>
        ) : (
          <td></td>
        ))}
      <td>{idxFromPath(wallet.path)}</td>
      <td>Account {idxFromPath(wallet.path)}</td>
      <td>
        <AddressLink
          address={convertAddrToPrefix(wallet.robust, coinType)}
          shouldTruncate={false}
          hideCopyText={false}
          useNewTabIcon
        />
      </td>
      <td>{makeFriendlyBalance(wallet.balance, 6, true)}</td>
      <td>{convertAddrToPrefix(wallet.id, coinType) || '-'}</td>
      <td>{wallet.path}</td>
    </tr>
  )
}

type WalletRowProps = {
  coinType: CoinType
  wallet: Wallet
  selectAccount: (i: number) => void
  index: number
  isSelected: boolean
  showSelectedWallet: boolean
}

WalletRow.propTypes = {
  coinType: COIN_TYPE_PROPTYPE.isRequired,
  wallet: WALLET_PROPTYPE.isRequired,
  selectAccount: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  showSelectedWallet: PropTypes.bool.isRequired
}

export const AccountsTable = ({
  wallets,
  selectAccount,
  loadingWallets,
  showSelectedWallet,
  selectedWalletPath
}: AccountsTableProps) => {
  const { coinType } = useEnvironment()
  return (
    <table>
      {loadingWallets && <LoadingCaption />}
      <thead>
        <tr>
          {showSelectedWallet && <th></th>}
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Balance</th>
          <th>Id</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((w, i) => (
          <WalletRow
            key={w.address}
            wallet={w}
            selectAccount={selectAccount}
            index={i}
            isSelected={
              Number(idxFromPath(w.path)) ===
              Number(idxFromPath(selectedWalletPath))
            }
            coinType={coinType}
            showSelectedWallet={showSelectedWallet}
          />
        ))}
      </tbody>
    </table>
  )
}

type AccountsTableProps = {
  wallets: Wallet[]
  selectAccount: (index: number) => void
  loadingWallets: boolean
  showSelectedWallet: boolean
  selectedWalletPath: string
}

AccountsTable.propTypes = {
  wallets: PropTypes.arrayOf(WALLET_PROPTYPE).isRequired,
  selectAccount: PropTypes.func.isRequired,
  loadingWallets: PropTypes.bool.isRequired,
  showSelectedWallet: PropTypes.bool.isRequired,
  selectedWalletPath: PropTypes.string.isRequired
}
