import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddressLink } from '../AddressLink'
import { space } from '../theme'
import { Wallet } from '../../services/WalletProvider'
import { convertAddrToPrefix, makeFriendlyBalance } from '../../utils'
import _LoaderGlyph from '../LoaderGlyph'
import { WALLET_PROPTYPE } from '../../customPropTypes'

const LoaderGlyph = styled(_LoaderGlyph)`
  margin-left: ${space()};
`

export const Row = styled.tr`
  margin-left: ${space()};
  &:hover {
    cursor: pointer;

    background-color: var(--blue-gray);

    -webkit-transition: background-color 100ms linear;
    -moz-transition: background-color 100ms linear;
    -o-transition: background-color 100ms linear;
    -ms-transition: background-color 100ms linear;
    transition: background-color 100ms linear;
  }
`

export const idxFromPath = (path: string): string => {
  return path.split('/')[5]
}

const StatusOuter = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  border: 1px solid var(--purple-medium);
  border-radius: 50%;
`

const StatusInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 11px;
  background: var(--purple-medium);
  border-radius: 50%;
  transform: translate(-50%, -50%);
`

const WalletRow = ({
  w,
  selectAccount,
  index,
  isSelected,
  showSelectedWallet
}: WalletRowProps) => {
  return (
    <Row key={w.robust} onClick={() => selectAccount(index)}>
      <td></td>
      {showSelectedWallet ? (
        isSelected ? (
          <td>
            <StatusOuter data-testid='selected-account'>
              <StatusInner />
            </StatusOuter>
          </td>
        ) : (
          <td></td>
        )
      ) : (
        <></>
      )}
      <td>{idxFromPath(w.path)}</td>
      <td>Account {idxFromPath(w.path)}</td>
      <td>
        <AddressLink
          address={convertAddrToPrefix(w.robust)}
          shouldTruncate={false}
        />
      </td>
      <td>{makeFriendlyBalance(w.balance, 6, true)}</td>
      <td>{convertAddrToPrefix(w.id) || '-'}</td>
      <td>{w.path}</td>
    </Row>
  )
}

type WalletRowProps = {
  w: Wallet
  selectAccount: (i: number) => void
  index: number
  isSelected: boolean
  showSelectedWallet: boolean
}

WalletRow.propTypes = {
  w: WALLET_PROPTYPE.isRequired,
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
            w={w}
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
              <LoaderGlyph />
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
