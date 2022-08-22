import styled from 'styled-components'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'
import { Colors } from '../theme'

const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${Colors.PURPLE_MEDIUM};
    font-size: 1.75rem;
  }
`

export const TransactionTotal = ({ total }: TransactionTotalProps) => {
  return (
    <>
      <hr />
      <Total>
        <span>Total</span>
        <span>{total.toFil()} FIL</span>
      </Total>
    </>
  )
}

export interface TransactionTotalProps {
  total: FilecoinNumber
}

TransactionTotal.propTypes = {
  total: FILECOIN_NUMBER_PROPTYPE.isRequired
}
