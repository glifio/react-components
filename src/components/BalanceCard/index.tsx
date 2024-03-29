import styled from 'styled-components'
import { useState } from 'react'
import { func, bool } from 'prop-types'
import { FilecoinNumber } from '@glif/filecoin-number'

import { ButtonV2 } from '../Button/V2'
import { OutlineBox } from '../Layout'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'
import { makeFriendlyBalance } from '../../utils/makeFriendlyBalance'
import { Colors, FontSizes, Spaces } from '../theme'

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
    font-size: ${FontSizes.LARGE};
    margin-bottom: 1em;

    h3 {
      margin: 0;
    }

    .toggle {
      display: flex;
      gap: ${Spaces.MEDIUM};
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
    font-size: ${FontSizes.XXLARGE};
    font-weight: 700;
  }
`

export const BalanceCard = ({
  balance,
  onSend,
  disableButtons
}: BalanceCardProps) => {
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
        {preciseMode ? balance.toFil() : makeFriendlyBalance(balance)} FIL
      </p>
      <ButtonV2 green disabled={disableButtons} onClick={onSend}>
        Send
      </ButtonV2>
    </BalanceBox>
  )
}

interface BalanceCardProps {
  balance: FilecoinNumber
  onSend: () => void
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
