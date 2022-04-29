import styled from 'styled-components'
import { FilecoinNumber } from '@glif/filecoin-number'
import {
  ADDRESS_PROPTYPE,
  FILECOIN_NUMBER_PROPTYPE
} from '@glif/react-components'

import truncateAddress from '../../utils/truncateAddress'
import makeFriendlyBalance from '../../utils/makeFriendlyBalance'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > * {
    display: flex;
    flex-direction: column;

    &:first-child {
      align-items: flex-start;
    }

    &:last-child {
      align-items: flex-end;
    }
  }
`

export const TransactionHeader = ({
  address,
  balance
}: TransactionHeaderProps) => {
  return (
    <Header>
      <div>
        <span>From</span>
        <span>{truncateAddress(address)}</span>
      </div>
      <div>
        <span>Balance</span>
        <span>{makeFriendlyBalance(balance, 6, true)} FIL</span>
      </div>
    </Header>
  )
}

interface TransactionHeaderProps {
  address: string
  balance: FilecoinNumber
}

TransactionHeader.propTypes = {
  address: ADDRESS_PROPTYPE.isRequired,
  balance: FILECOIN_NUMBER_PROPTYPE.isRequired
}
