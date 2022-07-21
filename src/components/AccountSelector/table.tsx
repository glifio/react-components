import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TABLE, TR, TH, TD } from '../HistoryTables/table'
import { AddressLink } from '../AddressLink'
import { space } from '../theme'
import { Wallet } from '../../services/WalletProvider'
import { convertAddrToPrefix, makeFriendlyBalance } from '../../utils'
import _LoaderGlyph from '../LoaderGlyph'
import { WALLET_PROPTYPE } from '../../customPropTypes'

const LoaderGlyph = styled(_LoaderGlyph)`
  margin-left: ${space()};
`

export const Row = styled(TR)`
  margin-left: ${space()};
  &:hover {
    cursor: pointer;

    background-color: var(--purple-light);

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

const WalletRow = ({
  w,
  selectAccount,
  index
}: {
  w: Wallet
  selectAccount: (i: number) => void
  index: number
}) => {
  return (
    <Row key={w.robust} onClick={() => selectAccount(index)}>
      <TD></TD>
      <TD>{idxFromPath(w.path)}</TD>
      <TD>Account {idxFromPath(w.path)}</TD>
      <TD>
        <AddressLink
          address={convertAddrToPrefix(w.robust)}
          shouldTruncate={false}
        />
      </TD>
      <TD>{makeFriendlyBalance(w.balance, 6, true)}</TD>
      <TD>{convertAddrToPrefix(w.id) || '-'}</TD>
      <TD>{w.path}</TD>
    </Row>
  )
}

export const WalletsTable = ({
  wallets,
  selectAccount,
  loadingWallets
}: WalletsTableProps) => {
  return (
    <TABLE className='narrow'>
      <thead>
        <TR>
          <TH></TH>
          <TH>#</TH>
          <TH>Name</TH>
          <TH>Address</TH>
          <TH>Balance</TH>
          <TH>Id</TH>
          <TH>Path</TH>
        </TR>
      </thead>
      <tbody>
        {wallets.map((w, i) => (
          <WalletRow
            key={w.address}
            w={w}
            selectAccount={selectAccount}
            index={i}
          />
        ))}
        {loadingWallets && (
          <TR>
            <TD></TD>
            <TD>
              <LoaderGlyph />
            </TD>
            <TD>Loading...</TD>
            <TD></TD>
            <TD></TD>
            <TD></TD>
          </TR>
        )}
      </tbody>
    </TABLE>
  )
}

type WalletsTableProps = {
  wallets: Wallet[]
  loadingWallets: boolean
  selectAccount: (index: number) => void
}

WalletsTable.propTypes = {
  wallets: PropTypes.arrayOf(WALLET_PROPTYPE).isRequired,
  loadingWallets: PropTypes.bool.isRequired,
  selectAccount: PropTypes.func.isRequired
}
