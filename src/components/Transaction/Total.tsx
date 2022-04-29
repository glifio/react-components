import styled from 'styled-components'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FILECOIN_NUMBER_PROPTYPE } from '@glif/react-components'

const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: var(--purple-medium);
    font-size: 1.75rem;
  }
`

export const TransactionTotal = ({ total }: TransactionTotalProps) => {
  return (
    <footer>
      <hr />
      <Total>
        <span>Total</span>
        <span>{total.toFil()} FIL</span>
      </Total>
    </footer>
  )
}

interface TransactionTotalProps {
  total: FilecoinNumber
}

TransactionTotal.propTypes = {
  total: FILECOIN_NUMBER_PROPTYPE.isRequired
}
