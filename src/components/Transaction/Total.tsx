import styled from 'styled-components'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'

const Footer = styled.footer`
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
    <Footer>
      <span>Total</span>
      <span>{total.toFil()} FIL</span>
    </Footer>
  )
}

interface TransactionTotalProps {
  total: FilecoinNumber
}

TransactionTotal.propTypes = {
  total: FILECOIN_NUMBER_PROPTYPE.isRequired
}
