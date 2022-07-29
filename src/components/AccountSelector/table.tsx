import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddressLink } from '../LabeledText/AddressLink'
import { Wallet } from '../../services/WalletProvider'
import { convertAddrToPrefix, makeFriendlyBalance } from '../../utils'
import { LoadingIcon } from '../Loading/LoadingIcon'
import { StatusIcon } from '../Layout'
import { WALLET_PROPTYPE } from '../../customPropTypes'

export const idxFromPath = (path: string): string => {
  return path.split('/')[5]
}

const WalletRow = ({
  wallet,
  selectAccount,
  index,
  isSelected,
  showSelectedWallet
}: WalletRowProps) => {
  return (
    <tr
      className='selectable'
      key={wallet.robust}
      onClick={() => selectAccount(index)}
    >
      <td></td>
      {showSelectedWallet && (
        <td>
          {isSelected && <StatusIcon color='purple' data-testid='selected-account' />}
        </td>
      )}
      <td>{idxFromPath(wallet.path)}</td>
      <td>Account {idxFromPath(wallet.path)}</td>
      <td>
        <AddressLink
          address={convertAddrToPrefix(wallet.robust)}
          shouldTruncate={false}
        />
      </td>
      <td>{makeFriendlyBalance(wallet.balance, 6, true)}</td>
      <td>{convertAddrToPrefix(wallet.id) || '-'}</td>
      <td>{wallet.path}</td>
    </tr>
  )
}

type WalletRowProps = {
  wallet: Wallet
  selectAccount: (i: number) => void
  index: number
  isSelected: boolean
  showSelectedWallet: boolean
}

WalletRow.propTypes = {
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
  return (
    <table>
      <thead>
        <tr>
          {showSelectedWallet && <th></th>}
          <th></th>
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
            showSelectedWallet={showSelectedWallet}
          />
        ))}
        {loadingWallets && (
          <tr>
            <td></td>
            <td>
              <LoadingIcon />
            </td>
            <td>Loading...</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
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
  selectedWalletPath: PropTypes.string.isRequired,
  selectAccount: PropTypes.func.isRequired,
  loadingWallets: PropTypes.bool.isRequired,
  showSelectedWallet: PropTypes.bool.isRequired
}
