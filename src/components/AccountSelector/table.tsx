import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Wallet } from '../../services/WalletProvider'
import { convertAddrToPrefix, makeFriendlyBalance } from '../../utils'
import { LoadingCaption, StatusIcon } from '../Layout'
import { WALLET_PROPTYPE } from '../../customPropTypes'
import { CopyText } from '../Copy'
import { IconNewTab } from '../Icons'

export const idxFromPath = (path: string): string => {
  return path.split('/')[5]
}

const AddressEle = styled.div`
  display: flex;
  grid-gap: 0.3em;
  line-height: 1.5;
  align-items: center;
`

const IconNewTabWrapper = styled.a`
  line-height: 1;

  > svg {
    transition: 0.24s ease-in-out;

    &:hover {
      transform: scale(1.25);
      fill: var(--purple-medium);
    }
  }
`

const WalletRow = ({
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
        <AddressEle>
          {convertAddrToPrefix(wallet.robust)}
          <IconNewTabWrapper
            target='_blank'
            rel='noopener noreferrer'
            href={`${
              process.env.NEXT_PUBLIC_EXPLORER_URL
            }/actor/?address=${convertAddrToPrefix(
              wallet.robust || wallet.id
            )}`}
          >
            <IconNewTab />
          </IconNewTabWrapper>
          <CopyText
            text={wallet.robust || wallet.id}
            hideCopyText={false}
            color='var(--purple-medium)'
            stopPropagation
          />
        </AddressEle>
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
