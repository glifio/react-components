import styled from 'styled-components'
import { FilecoinNumber } from '@glif/filecoin-number'
import {
  ADDRESS_PROPTYPE,
  FILECOIN_NUMBER_PROPTYPE
} from '../../customPropTypes'
import { makeFriendlyBalance, truncateAddress } from '../../utils'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-l);

  > * {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 0 0 auto;

    &:first-child {
      align-items: flex-start;
      flex: 1 0 auto;
    }
  }
`

export const TransactionBalance = ({
  address,
  balance,
  msigBalance
}: TransactionBalanceProps) => {
  return (
    <Header>
      <div>
        <span>From</span>
        <span>{truncateAddress(address)}</span>
      </div>
      <div>
        <span>{msigBalance && 'Signer '}Balance</span>
        <span>
          <>{makeFriendlyBalance(balance)} FIL</>
        </span>
      </div>
      {msigBalance && (
        <div>
          <span>Safe Balance</span>
          <span>
            <>{makeFriendlyBalance(msigBalance)} FIL</>
          </span>
        </div>
      )}
    </Header>
  )
}

export interface TransactionBalanceProps {
  address: string
  balance: FilecoinNumber
  msigBalance?: FilecoinNumber
}

TransactionBalance.propTypes = {
  address: ADDRESS_PROPTYPE.isRequired,
  balance: FILECOIN_NUMBER_PROPTYPE.isRequired,
  msigBalance: FILECOIN_NUMBER_PROPTYPE
}
