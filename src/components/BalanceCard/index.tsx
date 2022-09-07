import styled from 'styled-components'
import { useState } from 'react'
import { func, bool } from 'prop-types'
import { ButtonV2 } from '../Button/V2'
import { OutlineBox } from '../Layout'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'
import makeFriendlyBalance from '../../utils/makeFriendlyBalance'
import { Colors } from '../theme'
import { FilecoinNumber } from '@glif/filecoin-number'

const BalanceBox = styled(OutlineBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18em;
  height: 18em;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size-l);
    margin-bottom: 1em;

    h3 {
      margin: 0;
    }

    .toggle {
      display: flex;
      gap: var(--space-m);
      font-size: 1rem;

      span {
        color: ${Colors.GRAY_DARK};

        &.active {
          color: ${Colors.BLACK};
        }

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }

  hr {
    margin: 0;
  }

  .balance {
    font-size: var(--font-size-xxl);
    font-weight: 700;
  }
`

export const BalanceCard = ({ balance, onSend, disableButtons }: BalanceCardProps) => {
  const [preciseMode, setPreciseMode] = useState(false)
  return (
    <BalanceBox>
      <div>
        <div className='title'>
          <h3>Balance</h3>
          <div className='toggle'>
            <span
              className={preciseMode ? '' : 'active'}
              onClick={() => setPreciseMode(false)}
            >
              Approx.
            </span>
            <span
              className={preciseMode ? 'active' : ''}
              onClick={() => setPreciseMode(true)}
            >
              Exact
            </span>
          </div>
        </div>
        <hr />
      </div>
      <p className='balance'>
        {preciseMode ? balance.toFil() : makeFriendlyBalance(balance, 3)} FIL
      </p>
      <ButtonV2 green disabled={disableButtons} onClick={onSend}>
        Send
      </ButtonV2>
    </BalanceBox>
  )
}

interface BalanceCardProps {
  balance: FilecoinNumber,
  onSend: () => void,
  disableButtons: boolean
}

BalanceCard.propTypes = {
  /**
   * users balance in Filecoin denom
   */
  balance: FILECOIN_NUMBER_PROPTYPE.isRequired,
  /**
   * action fired when send button is clicked
   */
  onSend: func.isRequired,
  /**
   * determines if the buttons should be disabled or not
   */
  disableButtons: bool
}

BalanceCard.defaultProps = {
  disableButtons: false
}
